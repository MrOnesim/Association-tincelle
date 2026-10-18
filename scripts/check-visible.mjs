/**
 * Contrôle visuel : ouvre chaque page dans un navigateur sans JavaScript
 * et mesure ce qui est réellement visible à l'écran.
 *
 * Compter les caractères dans le HTML ne suffit pas : un bloc peut
 * contenir du texte tout en restant masqué par CSS. Ici on interroge le
 * rendu réel, avec JavaScript désactivé, comme le verra un visiteur dont
 * le script n'a pas abouti.
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
  '/blog/comment-deposer-une-demande-aide',
  '/mentions-legales',
]

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
})

let fail = 0

for (const path of pages) {
  const page = await browser.newPage()
  // JavaScript désactivé : c'est la situation d'une page pré-rendue.
  await page.setJavaScriptEnabled(false)
  await page.goto(`${SITE}${path}`, { waitUntil: 'networkidle0', timeout: 60000 })

  const stats = await page.evaluate(() => {
    // checkVisibility examine la chaîne des ancêtres : opacity est portée par
    // le bloc .reveal, alors que getComputedStyle sur une feuille renverrait
    // « 1 » et laisserait croire que tout est visible.
    const isReallyVisible = (el) => {
      if (typeof el.checkVisibility === 'function') {
        return el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })
      }
      let node = el
      while (node && node !== document.documentElement) {
        const s = getComputedStyle(node)
        if (s.display === 'none' || s.visibility === 'hidden' || s.opacity === '0') return false
        node = node.parentElement
      }
      return true
    }

    const leaves = [...document.querySelectorAll('body *')].filter(
      (el) => el.textContent?.trim() && !el.children.length,
    )

    let visibleChars = 0
    let invisibleChars = 0
    for (const el of leaves) {
      const text = el.textContent.trim().length
      if (isReallyVisible(el)) visibleChars += text
      else invisibleChars += text
    }

    const h1 = document.querySelector('h1')?.textContent?.trim().slice(0, 60)
    return { visibleChars, invisibleChars, h1, leaves: leaves.length }
  })

  const ratio = stats.visibleChars + stats.invisibleChars > 0
    ? stats.visibleChars / (stats.visibleChars + stats.invisibleChars)
    : 0

  const ok = stats.visibleChars > 200 && ratio > 0.9
  if (!ok) fail += 1

  console.log(
    `${ok ? 'OK  ' : 'FAIL'}  ${path.padEnd(40)} visible ${String(stats.visibleChars).padStart(5)} | masqué ${String(stats.invisibleChars).padStart(5)} | ${(ratio * 100).toFixed(0)}%`,
  )
  console.log(`        h1 : ${stats.h1 || '(aucun)'}`)
  await page.close()
}

await browser.close()
console.log(`\n${fail === 0 ? 'Toutes les pages sont lisibles sans JavaScript.' : `${fail} page(s) problematic(s).`}`)
process.exit(fail === 0 ? 0 : 1)