/**
 * Compte, dans les fichiers générés, les blocs animés au défilement qui
 * resteraient invisibles (opacity: 0 sans JavaScript).
 *
 * Usage : node scripts\check-reveal.mjs [dossier]
 */
import fs from 'node:fs'
import path from 'node:path'

const root = process.argv[2] || 'dist'

const walk = (dir) =>
  fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) return walk(full)
    return entry.name.endsWith('.html') ? [full] : []
  })

let total = 0
for (const file of walk(root)) {
  const html = fs.readFileSync(file, 'utf8')
  const classes = html.match(/class="[^"]*\breveal\b[^"]*"/g) || []
  const hidden = classes.filter((c) => !/is-visible/.test(c))
  if (hidden.length) {
    total += hidden.length
    console.log(`  ${file.replace(/\\/g, '/')} : ${hidden.length} bloc(s) masqué(s)`)
    console.log(`    exemple : ${hidden[0].slice(0, 110)}`)
  }
}

console.log(
  total === 0
    ? 'OK  aucun bloc masqué : le contenu est visible sans JavaScript'
    : `ÉCHEC  ${total} bloc(s) masqué(s)`,
)
process.exit(total === 0 ? 0 : 1)