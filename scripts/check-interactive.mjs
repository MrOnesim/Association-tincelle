/**
 * Contrôle complet d'une page déployée.
 *
 *  1. Sans JavaScript : le contenu est-il lisible ? (pour Google)
 *  2. Avec JavaScript : les fonctionnalités répondent-elles ?
 *     (accords FAQ, menu mobile, liens, console sans erreur)
 */
import puppeteer from 'puppeteer'

const SITE = process.argv[2] || 'https://association-tincelle.vercel.app'

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
})

let fail = 0
const check = (label, ok, detail = '') => {
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`)
  if (!ok) fail += 1
}

const visibleChars = async (url) => {
  const page = await browser.newPage()
  await page.setJavaScriptEnabled(false)
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 })
  const stats = await page.evaluate(() => {
    const vis = (el) =>
      typeof el.checkVisibility === 'function'
        ? el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })
        : true
    const leaves = [...document.querySelectorAll('body *')].filter(
      (el) => el.textContent?.trim() && !el.children.length,
    )
    let v = 0
    let h = 0
    for (const el of leaves) {
      const n = el.textContent.trim().length
      if (vis(el)) v += n
      else h += n
    }
    return { v, h }
  })
  await page.close()
  return stats
}

console.log('=== 1. Lisibilité sans JavaScript ===')
for (const path of ['/', '/programmes', '/faq', '/blog', '/blog/comment-deposer-une-demande-aide']) {
  const s = await visibleChars(`${SITE}${path}`)
  const ratio = s.v / (s.v + s.h)
  check(path.padEnd(38), s.v > 200 && ratio > 0.8, `${s.v} visibles / ${s.h} masqués (${(ratio * 100).toFixed(0)}%)`)
}

console.log('\n=== 2. Fonctionnalités avec JavaScript ===')

// Accord FAQ : le clic doit ouvrir la réponse
{
  const page = await browser.newPage()
  const errors = []
  page.on('pageerror', (e) => errors.push(String(e).slice(0, 120)))
  await page.goto(`${SITE}/faq`, { waitUntil: 'networkidle0', timeout: 60000 })
  await new Promise((r) => setTimeout(r, 500))

  const before = await page.evaluate(() => {
    const b = document.querySelectorAll('button[aria-expanded]')[0]
    return b ? b.getAttribute('aria-expanded') : null
  })
  await page.evaluate(() => document.querySelectorAll('button[aria-expanded]')[0]?.click())
  await new Promise((r) => setTimeout(r, 700))
  const after = await page.evaluate(() => {
    const b = document.querySelectorAll('button[aria-expanded]')[0]
    return b ? b.getAttribute('aria-expanded') : null
  })
  check('accord FAQ s’ouvre au clic', before === 'false' && after === 'true', `${before} -> ${after}`)
  check('aucune erreur JavaScript sur /faq', errors.length === 0, errors.join(' | '))
  await page.close()
}

// Navigation entre pages (le routeur doit répondre)
{
  const page = await browser.newPage()
  await page.goto(`${SITE}/`, { waitUntil: 'networkidle0', timeout: 60000 })
  await new Promise((r) => setTimeout(r, 400))
  const link = await page.evaluate(() => {
    const a = [...document.querySelectorAll('a')].find((x) => x.getAttribute('href')?.endsWith('/programmes'))
    return a ? a.getAttribute('href') : null
  })
  if (link) {
    await page.goto(`${SITE}${link}`, { waitUntil: 'networkidle0', timeout: 60000 })
    await new Promise((r) => setTimeout(r, 500))
    const h1 = await page.evaluate(() => document.querySelector('h1')?.textContent?.trim())
    check('navigation vers /programmes', Boolean(h1), h1)
  } else {
    check('lien /programmes trouvé', false)
  }
  await page.close()
}

// Formulaire de demande : champs présents
{
  const page = await browser.newPage()
  await page.goto(`${SITE}/demande`, { waitUntil: 'networkidle0', timeout: 60000 })
  await new Promise((r) => setTimeout(r, 500))
  const fields = await page.evaluate(() => document.querySelectorAll('input, textarea, select').length)
  check('formulaire de demande.render ses champs', fields > 5, `${fields} champ(s)`)
  await page.close()
}

await browser.close()
console.log(`\n${fail === 0 ? 'Tout fonctionne.' : `${fail} contrôle(s) en échec.`}`)
process.exit(fail === 0 ? 0 : 1)