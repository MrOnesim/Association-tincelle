/**
 * Contrôle de structure SEO sur le site déployé : chaque page publique
 * doit avoir exactement un <h1>, un titre et une description.
 *
 * Une page sans <h1> n'est pas necessarilycassée, mais Google et les
 * lecteurs d'écran s'en servent pour identifier le sujet de la page.
 */
import puppeteer from 'puppeteer'

const SITE = process.argv[2] || 'https://association-tincelle.vercel.app'

const pages = [
  '/',
  '/programmes',
  '/apropos',
  '/galerie',
  '/demande',
  '/faq',
  '/blog',
  '/mentions-legales',
  '/confidentialite',
]

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
})

let fail = 0
const check = (label, ok, detail = '') => {
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`)
  if (!ok) fail += 1
}

for (const path of pages) {
  const page = await browser.newPage()
  await page.setJavaScriptEnabled(false)
  await page.goto(`${SITE}${path}`, { waitUntil: 'networkidle0', timeout: 60000 })

  const info = await page.evaluate(() => ({
    h1: [...document.querySelectorAll('h1')].map((h) => h.textContent.trim().slice(0, 55)),
    title: document.title,
    desc:
      document.querySelector('meta[name="description"]')?.content?.slice(0, 45) || null,
    canonical: document.querySelector('link[rel="canonical"]')?.href || null,
  }))

  const label = path.padEnd(24)
  check(label, info.h1.length === 1, `${info.h1.length} <h1> : ${info.h1.join(' | ') || 'AUCUN'}`)
  check(`${label} titre`, Boolean(info.title), info.title)
  check(`${label} description`, Boolean(info.desc), info.desc || 'absente')
  check(`${label} canonical`, Boolean(info.canonical), info.canonical || 'absent')

  await page.close()
}

await browser.close()
console.log(`\n${fail === 0 ? 'Structure SEO conforme sur toutes les pages.' : `${fail} problème(s).`}`)
process.exit(fail === 0 ? 0 : 1)