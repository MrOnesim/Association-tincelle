import { useState } from 'react'

/**
 * Image avec repli gracieux : si `src` est introuvable (photo non encore
 * déposée dans public/assets), on bascule sur `fallback` pour ne jamais
 * afficher d'image cassée. Dès que le vrai fichier existe, il s'affiche.
 */
export default function SmartImage({
  src,
  fallback = '/assets/opt/administration.webp',
  alt = '',
  className = '',
  ...rest
}) {
  const [current, setCurrent] = useState(src)
  return (
    <img
      src={current}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      onError={() => {
        if (current !== fallback) setCurrent(fallback)
      }}
      {...rest}
    />
  )
}
