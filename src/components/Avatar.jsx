/**
 * Avatar « initiales » généré localement : aucune requête externe,
 * cohérent avec la palette de marque (dégradé vin → or).
 */
const palettes = [
  'from-wine-600 to-wine-400',
  'from-gold-500 to-gold-300',
  'from-ink to-wine-800',
  'from-wine-500 to-gold-400',
]

function initialsOf(name = '') {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
}

export default function Avatar({ name = '', index = 0, className = 'h-12 w-12 text-sm' }) {
  const palette = palettes[index % palettes.length]
  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${palette} font-display font-semibold text-white ring-2 ring-white/70 ${className}`}
    >
      {initialsOf(name) || 'É'}
    </span>
  )
}
