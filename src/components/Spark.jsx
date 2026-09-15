/**
 * L'« étincelle » : motif signature repris du logotype (étoile à 4 branches).
 * Sert de marqueur de section, de puce, de scintillement décoratif.
 */
export default function Spark({ className = '', style, twinkle = false, filled = true }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      style={style}
      className={`${twinkle ? 'animate-twinkle ' : ''}${className}`}
      fill={filled ? 'currentColor' : 'none'}
      stroke={filled ? 'none' : 'currentColor'}
      strokeWidth={filled ? 0 : 1.6}
    >
      <path d="M12 0c1 7 5 11 12 12-7 1-11 5-12 12-1-7-5-11-12-12C7 11 11 7 12 0Z" />
    </svg>
  )
}
