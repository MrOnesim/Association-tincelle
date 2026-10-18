/** Vérifie le site déployé : API publique, blog, admin, protection noindex. */
const SITE = process.argv[2] || 'https://association-tincelle.vercel.app'

const get = async (path) => {
  const res = await fetch(`${SITE}${path}`, { redirect: 'follow' })
  const text = await res.text()
  return { status: res.status, text }
}

// 1. API publique
try {
  const res = await fetch(`${SITE}/api/posts`)
  console.log(`GET /api/posts            ${res.status}`)
  const data = await res.json()
  if (Array.isArray(data)) {
    console.log(`  articles publiés : ${data.length}`)
    for (const p of data) console.log(`   - ${p.slug}`)
  } else {
    console.log(`  réponse inattendue :`, JSON.stringify(data).slice(0, 200))
  }
} catch (err) {
  console.log(`GET /api/posts            ERREUR ${err.message}`)
}

// 2. Un article précis
try {
  const res = await fetch(`${SITE}/api/posts?slug=comment-deposer-une-demande-aide`)
  const data = await res.json()
  console.log(`GET /api/posts?slug=...   ${res.status} — ${data ? data.title : 'vide'}`)
} catch (err) {
  console.log(`GET /api/posts?slug       ERREUR ${err.message}`)
}

// 3. Écriture sans session : doit être refusée
try {
  const res = await fetch(`${SITE}/api/article`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ slug: 'pirate', title: 'Pirate' }),
  })
  console.log(`POST /api/article         ${res.status} (attendu 401)`)
} catch (err) {
  console.log(`POST /api/article         ERREUR ${err.message}`)
}

// 4. Connexion avec un mauvais mot de passe : doit échouer
try {
  const res = await fetch(`${SITE}/api/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'aideassociationetincelle@gmail.com',
      password: 'mauvais-mot-de-passe',
    }),
  })
  console.log(`POST /api/login (faux)    ${res.status} (attendu 401)`)
} catch (err) {
  console.log(`POST /api/login           ERREUR ${err.message}`)
}

// 5. Session anonyme
try {
  const res = await fetch(`${SITE}/api/session`)
  const data = await res.json()
  console.log(`GET /api/session          ${res.status} — ${JSON.stringify(data)}`)
} catch (err) {
  console.log(`GET /api/session          ERREUR ${err.message}`)
}

// 6. Pages : contenu et métadonnées.
//    Le contrôle « visible » est indispensable : un bloc peut contenir du
//    texte tout en restant en opacity: 0, ce qui donne une page vide à l'écran.
for (const path of [
  '/',
  '/programmes',
  '/apropos',
  '/galerie',
  '/demande',
  '/faq',
  '/blog',
  '/blog/comment-deposer-une-demande-aide',
  '/admin',
]) {
  try {
    const { status, text } = await get(path)
    const title = text.split('<title>')[1]?.split('</title>')[0]
    const robots = text.match(/name="robots"[^>]*content="([^"]*)"/)?.[1]
    const body = text.split('<body')[1] || ''
    const visible = body
      .replace(/<script[\s\S]*?<\/script>/g, '')
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()

    // Blocs animés non activés = contenu invisible à l'écran.
    const hidden = (text.match(/class="[^"]*\breveal\b[^"]*"/g) || []).filter(
      (c) => !/is-visible/.test(c),
    ).length

    const flag = hidden > 0 ? '  <-- CONTENU MASQUE' : ''
    console.log(
      `${path.padEnd(38)} ${status} — robots=${robots} — ${String(visible.length).padStart(5)} car. — ${hidden} bloc(s) masqué(s)${flag}`,
    )
    console.log(`  ${' '.repeat(37)} ${title}`)
  } catch (err) {
    console.log(`${path.padEnd(38)} ERREUR ${err.message}`)
  }
}

// 7. Sitemap
try {
  const { status, text } = await get('/sitemap.xml')
  const urls = (text.match(/<loc>/g) || []).length
  console.log(`sitemap.xml                               ${status} — ${urls} URL(s)`)
} catch (err) {
  console.log(`sitemap.xml                               ERREUR ${err.message}`)
}