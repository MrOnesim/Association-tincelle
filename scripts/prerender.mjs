/**
 * Pré-rendu du SPA : visite chaque route avec un navigateur headless,
 * récupère le DOM rendu et écrit un fichier HTML statique dans dist.
 *
 * Objectif : que le HTML servi contienne le contenu réel, afin que Google
 * indexe les pages et les articles du blog sans exécuter de JavaScript.
 *
 * Usage : node scripts/prerender.mjs
 */
import { readFile, writeFile, mkdir, rm, cp } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'
import puppeteer from 'puppeteer'

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const DIST = path.join(ROOT, 'dist')

/** Routes statiques du site, à pré-rendre dans tous les cas. */
const STATIC_ROUTES = [
  '/',
  '/programmes',
  '/apropos',
  '/temoignages',
  '/partenaires',
  '/conditions',
  '/faq',
  '/demande',
  '/galerie',
  '/mentions-legales',
  '/confidentialite',
  '/blog',
  '/admin',
]

/**
 * Récupère les slugs d'articles publiés.
 *
 * Source prioritaire : la base PostgreSQL du blog, interrogée en direct
 * avec DATABASE_URL. Ce secret n'est lu qu'ici, au moment du build, et
 * n'entre jamais dans le code du site. En son absence, on retombe sur les
 * articles de démonstration, pour que le build ne casse pas.
 */
async function fetchPostSlugs() {
  const connectionString = process.env.DATABASE_URL

  const fallback = async (reason) => {
    const { localPosts } = await import('../src/data/posts.demo.js')
    const slugs = localPosts
      .filter((p) => p.status === 'published')
      .map((p) => p.slug)
      .filter(Boolean)
    console.warn(`[prerender] ${reason} — ${slugs.length} article(s) de démonstration`)
    return slugs
  }

  if (!connectionString) {
    return fallback('DATABASE_URL absente')
  }

  try {
    const pg = await import('pg')
    const pool = new pg.default.Pool({
      connectionString,
      max: 1,
      connectionTimeoutMillis: 15_000,
      ssl: connectionString.includes('sslmode=require')
        ? { rejectUnauthorized: false }
        : undefined,
    })

    const { rows } = await pool.query(
      `select slug from articles where status = 'published' order by published_at desc nulls last`,
    )
    await pool.end()

    const slugs = rows.map((r) => r.slug).filter(Boolean)
    console.log(`[prerender] ${slugs.length} article(s) publié(s) trouvé(s) en base`)
    return slugs
  } catch (err) {
    return fallback(`lecture de la base impossible (${err.message})`)
  }
}

/**
 * Extrait de la page rendue les balises de <head> propres à la route :
 * title, meta (description, robots, Open Graph, Twitter), canonical et JSON-LD.
 * On déduplique chaque balise selon son attribut identifiant, pour qu'une
 * balise déjà présente dans index.html soit écrasée et non dupliquée.
 */
function extractHead(head) {
  const tags = []
  const seen = new Set()

  const push = (key, tag) => {
    if (!tag || seen.has(key)) return
    seen.add(key)
    tags.push(tag)
  }

  for (const m of head.matchAll(/<meta\b[^>]*>/g)) {
    const tag = m[0]
    const name = tag.match(/\bname="([^"]*)"/)?.[1]
    const property = tag.match(/\bproperty="([^"]*)"/)?.[1]
    const httpEquiv = tag.match(/\bhttp-equiv="([^"]*)"/)?.[1]
    if (name) push(`name:${name}`, tag)
    else if (property) push(`property:${property}`, tag)
    else if (httpEquiv) push(`http-equiv:${httpEquiv}`, tag)
  }

  push('title', head.match(/<title>[\s\S]*?<\/title>/)?.[0])
  push('canonical', head.match(/<link\b[^>]*rel="canonical"[^>]*>/)?.[0])

  const jsonLd = head.match(
    /<script\b[^>]*id="route-jsonld"[^>]*>[\s\S]*?<\/script>/,
  )
  if (jsonLd) push('jsonld', jsonLd[0])

  return tags
}

/**
 * Remplace, dans la coquille index.html, les balises de <head> ciblées par
 * celles extraites de la page rendue. Le corps est remplacé par le DOM rendu.
 */
function composeHtml(shell, rendered) {
  const renderedHead = rendered.match(/<head[^>]*>([\s\S]*?)<\/head>/)?.[1] || ''
  const renderedBody = rendered.match(/<body[^>]*>([\s\S]*)<\/body>/)
  let html = shell

  // Titre : un seul, celui de la route.
  const title = renderedHead.match(/<title>[\s\S]*?<\/title>/)?.[0]
  if (title) {
    html = title
      ? html.replace(/<title>[\s\S]*?<\/title>/, title)
      : html.replace('</head>', `  ${title}\n  </head>`)
  }

  // Autres balises de head : on retire d'abord celles de la coquille qui
  // sont concernées, puis on insère celles de la route juste avant </head>.
  const tags = extractHead(renderedHead)
  for (const tag of tags) {
    if (tag.startsWith('<title')) continue

    // Identifiant de la balise (name / property / rel), pour remplacer
    // celle de la coquille plutôt que de l'ajouter à côté.
    const ident =
      tag.match(/\bname="([^"]*)"/) ||
      tag.match(/\bproperty="([^"]*)"/) ||
      tag.match(/\brel="([^"]*)"/) ||
      tag.match(/\bid="([^"]*)"/)
    const key = ident ? ident[1] : null
    if (key) {
      const escaped = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      html = html.replace(new RegExp(`<meta\\b[^>]*(?:name|property|id)="${escaped}"[^>]*>`, 'g'), '')
      html = html.replace(new RegExp(`<link\\b[^>]*rel="${escaped}"[^>]*>`, 'g'), '')
      html = html.replace(new RegExp(`<script\\b[^>]*id="${escaped}"[^>]*>[\\s\\S]*?<\\/script>`, 'g'), '')
    }
    html = html.replace('</head>', `  ${tag}\n  </head>`)
  }

  if (renderedBody) {
    const bodyAttrs = rendered.match(/<body([^>]*)>/)?.[1] || ''
    html = html.replace(
      /<body([^>]*)>[\s\S]*<\/body>/,
      `<body${bodyAttrs}>${renderedBody[1]}</body>`,
    )
  }

  return html
}

/**
 * Rend les URL absolues relatives à la page courante.
 *
 * Chaque page statique vit dans son propre sous-dossier
 * (dist/blog/mon-article/index.html), donc un lien « /programmes » doit
 * devenir « ../../programmes » pour rester correct en ouverture directe.
 * Un simple « ./programmes » depuis /blog/mon-article/ pointerait vers
 * /blog/mon-article/programmes, qui n'existe pas.
 */
function toStaticHtml(html, route) {
  const depth = route === '/' ? 0 : route.slice(1).split('/').length
  const prefix = depth === 0 ? './' : '../'.repeat(depth)

  return html
    .replace(/<script[^>]*type="module"[^>]*><\/script>/g, '')
    .replace(/(href|src)="\/(?!\/)([^"]*)"/g, (_, attr, rest) => {
      // On ne touche pas aux URL absolues externes ni aux racines
      // techniques (mailto:, tel:, #, data:).
      if (/^[a-z]+:/i.test(rest) || rest.startsWith('#')) return `${attr}="/${rest}"`
      return `${attr}="${prefix}${rest}"`
    })
}

const routes = [...STATIC_ROUTES]

const slugs = await fetchPostSlugs()
for (const slug of slugs) routes.push(`/blog/${slug}`)

console.log(`[prerender] ${routes.length} route(s) à pré-rendre`)

// Coquille du build, lue avant toute écriture : c'est elle qui sert de
// gabarit pour composer chaque page statique.
const indexHtml = await readFile(path.join(DIST, 'index.html'), 'utf8')

// Emplacement temporaire servant la coquille NON déstatifiée pendant le
// rendu. Sans cela, on servirait les fichiers déjà statiques (où le script
// d'hydratation a été retiré) et React ne monterait jamais : le navigateur
// afficherait le contenu de la page d'accueil sur toutes les routes.
const shellDir = path.join(ROOT, '.prerender-shell')
await rm(shellDir, { recursive: true, force: true })
await mkdir(shellDir, { recursive: true })
await cp(DIST, shellDir, { recursive: true })
await writeFile(path.join(shellDir, 'index.html'), indexHtml, 'utf8')

// Serveur local pour que les routes /blog/... soient résolues par le SPA
// (le serveur statif servirait sinon un 404). Port 0 = port libre choisi
// par le système, ce qui évite les collisions entre deux builds.
const server = await createServer({
  root: shellDir,
  server: { port: 0 },
  appType: 'spa',
})
await server.listen()
const addr = server.httpServer.address()
if (!addr || typeof addr === 'string') {
  throw new Error('Serveur de pré-rendu injoignable')
}
// Sans barre oblique finale, sinon la concaténation produit « //faq ».
const origin = `http://localhost:${addr.port}`
console.log(`[prerender] serveur local sur ${origin}`)

/**
 * Régénère le sitemap : les routes fixes y sont déclarées, les articles
 * publiés y sont ajoutés. Un sitemap figé ne mentionnerait jamais les
 * nouveaux articles, ce qui nuirait à leur découverte.
 *
 * Généré avant le rendu et hors de toute dépendance à Chromium, pour que
 * le fichier soit présent même si le pré-rendu est ignoré.
 */
const SITE = 'https://association-tincelle.vercel.app'
const today = new Date().toISOString().slice(0, 10)

const FIXED_URLS = [
  ['/', '1.0', 'weekly'],
  ['/programmes', '0.9', 'monthly'],
  ['/apropos', '0.8', 'monthly'],
  ['/demande', '0.9', 'monthly'],
  ['/partenaires', '0.7', 'monthly'],
  ['/temoignages', '0.7', 'monthly'],
  ['/galerie', '0.6', 'monthly'],
  ['/faq', '0.7', 'monthly'],
  ['/blog', '0.8', 'weekly'],
  ['/conditions', '0.5', 'yearly'],
  ['/mentions-legales', '0.3', 'yearly'],
  ['/confidentialite', '0.3', 'yearly'],
]

const entry = (loc, priority, changefreq) =>
  `  <url>\n    <loc>${SITE}${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${changefreq}</changefreq>\n    <priority>${priority}</priority>\n  </url>`

const sitemapBody = [
  ...FIXED_URLS.map(([loc, p, f]) => entry(loc, p, f)),
  ...slugs.map((slug) => entry(`/blog/${slug}`, '0.7', 'monthly')),
].join('\n')

await writeFile(
  path.join(DIST, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${sitemapBody}\n</urlset>\n`,
  'utf8',
)
console.log(`[prerender] sitemap.xml : ${FIXED_URLS.length + slugs.length} URL(s)`)

/**
 * Lance Chromium. Sur un environnement qui ne fournit pas les bibliothèques
 * système attendues (Vercel, conteneurs allégés), le lancement échoue. Dans
 * ce cas on ne bloque pas le build : le site est déployé en version
 * dynamique, simplement sans le bénéfice du pré-rendu pour Google.
 */
let browser = null
try {
  browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
  })
} catch (err) {
  console.warn(`[prerender] Chromium indisponible (${err.message})`)
  console.warn('[prerender] build conservé en version dynamique, pré-rendu ignoré')
  await server.close()
  await rm(shellDir, { recursive: true, force: true })
  process.exit(0)
}

let failures = 0

try {
  for (const route of routes) {
    const page = await browser.newPage()
    await page.goto(`${origin}${route}`, {
      waitUntil: 'networkidle0',
      timeout: 60000,
    })
    // Laisse React injecter le contenu et les métadonnées de la route.
    await new Promise((r) => setTimeout(r, 600))

    const rendered = await page.content()
    await page.close()

    // Groupe 0 = balise entière, groupe 1 = contenu entre les balises.
    const titleMatch = rendered.match(/<title>([\s\S]*?)<\/title>/)
    if (!titleMatch) {
      console.error(`[prerender] ${route} : aucun <title>, page ignorée`)
      failures += 1
      continue
    }
    const title = titleMatch[1]
    if (!title.trim()) {
      console.error(`[prerender] ${route} : <title> vide, page ignorée`)
      failures += 1
      continue
    }

    const staticHtml = toStaticHtml(composeHtml(indexHtml, rendered), route)

    const outPath =
      route === '/'
        ? path.join(DIST, 'index.html')
        : path.join(DIST, route.slice(1), 'index.html')
    await mkdir(path.dirname(outPath), { recursive: true })
    await writeFile(outPath, staticHtml, 'utf8')

    console.log(`[prerender] ${route} -> ${path.relative(ROOT, outPath)}`)
  }
} finally {
  await browser.close()
  await server.close()
  await rm(shellDir, { recursive: true, force: true })
}

if (failures > 0) {
  console.warn(`[prerender] ${failures} route(s) en échec, build conservé`)
}

console.log('[prerender] Terminé')