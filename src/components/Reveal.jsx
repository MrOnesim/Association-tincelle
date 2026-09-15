import { useEffect, useRef, useState } from 'react'

/**
 * Apparition au scroll avec variantes de direction et délai.
 * Respecte prefers-reduced-motion (géré en CSS).
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
  variant = 'up', // 'up' | 'left' | 'right' | 'scale'
  as: Tag = 'div',
  once = true,
}) {
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true)
          if (once) obs.disconnect()
        } else if (!once) {
          setShown(false)
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [once])

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal reveal-${variant} ${shown ? 'is-visible' : ''} ${className}`}
    >
      {children}
    </Tag>
  )
}
