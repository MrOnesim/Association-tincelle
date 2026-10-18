/**
 * Liste précisément ce qui reste invisible sur une page, avec un extrait
 * du texte masqué et la chaîne de classes responsable.
 *
 * Usage : node scripts\diagnose-hidden.mjs /faq [site]
 */
import puppeteer from 'puppeteer'

const path = process.argv[2] || '/faq'
const SITE = process.argv[3] || 'https://association-tincelle.vercel.app'

const browser = await puppeteer.launch({
  headless: true,
  args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-dev-shm-usage'],
})

const page = await browser.newPage()
await page.setJavaScriptEnabled(false)
await page.goto(`${SITE}${path}`, { waitUntil: 'networkidle0', timeout: 60000 })

const hidden = await page.evaluate(() => {
  const isReallyVisible = (el) => {
    if (typeof el.checkVisibility === 'function') {
      return el.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true })
    }
    return true
  }

  const reasonFor = (el) => {
    let node = el
    while (node && node !== document.documentElement) {
      const s = getComputedStyle(node)
      if (s.display === 'none') return `display:none sur <${node.tagName.toLowerCase()}> .${node.className?.toString?.().slice(0, 40)}`
      if (s.visibility === 'hidden') return `visibility:hidden sur .${node.className?.toString?.().slice(0, 40)}`
      if (s.opacity === '0') return `opacity:0 sur .${node.className?.toString?.().slice(0, 40)}`
      node = node.parentElement
    }
    return 'hors écran'
  }

  return [...document.querySelectorAll('body *')]
    .filter((el) => el.textContent?.trim() && !el.children.length)
    .filter((el) => !isReallyVisible(el))
    .map((el) => ({
      text: el.textContent.trim().slice(0, 70),
      cls: el.className?.toString?.().slice(0, 60),
      reason: reasonFor(el),
    }))
})

console.log(`=== ${path} — ${hidden.length} élément(s) masqué(s) ===`)
for (const h of hidden.slice(0, 25)) {
  console.log(`  « ${h.text} »`)
  console.log(`    classe : ${h.cls}`)
  console.log(`    cause  : ${h.reason}`)
}

await browser.close()