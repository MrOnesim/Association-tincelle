const LOGO_SRC = '/assets/logo-etincelle.png'

/**
 * Logotype officiel de l'Association Étincelle (tulipe + étincelle).
 * `onDark` l'pose sur une tuile porcelaine pour garantir le contraste
 * sur les fonds encre (pied de page, menu mobile, assistant).
 */
export default function Logo({
  className = 'h-11 w-auto',
  onDark = false,
  tileClass = 'rounded-2xl bg-porcelain p-2',
  alt = 'Association Étincelle',
}) {
  const img = <img src={LOGO_SRC} alt={alt} className={className} decoding="async" />
  if (!onDark) return img
  return (
    <span className={`grid shrink-0 place-items-center shadow-soft ring-1 ring-white/10 ${tileClass}`}>
      {img}
    </span>
  )
}
