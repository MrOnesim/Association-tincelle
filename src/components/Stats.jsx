import { useEffect, useRef, useState } from 'react'
import Spark from './Spark'

function useCounter(end, duration = 1800) {
  const [value, setValue] = useState(0)
  const ref = useRef(null)
  const started = useRef(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true
          const startTime = performance.now()
          const tick = (now) => {
            const progress = Math.min((now - startTime) / duration, 1)
            // easing "ease-out" pour un compteur plus naturel
            const eased = 1 - Math.pow(1 - progress, 3)
            setValue(Math.round(eased * end))
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [end, duration])

  return [value, ref]
}

function Stat({ end, suffix, label }) {
  const [value, ref] = useCounter(end)
  return (
    <div ref={ref} className="relative text-center">
      <p className="font-display text-4xl font-semibold text-gold-300 sm:text-5xl">
        {value.toLocaleString('fr-FR')}
        <span className="text-gold-400">{suffix}</span>
      </p>
      <p className="mt-3 text-sm font-semibold uppercase tracking-widest2 text-porcelain/55">{label}</p>
    </div>
  )
}

const stats = [
  { end: 2500, suffix: '+', label: 'Bénéficiaires' },
  { end: 5, suffix: ' M€', label: 'Fonds accordés' },
  { end: 98, suffix: ' %', label: 'Satisfaction' },
  { end: 15, suffix: '+', label: 'Pays accompagnés' },
]

export default function Stats() {
  return (
    <section className="grain relative overflow-hidden bg-ink-grad py-24 text-porcelain sm:py-28">
      <div className="pointer-events-none absolute -top-24 -right-20 h-80 w-80 rounded-full bg-wine-600/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-20 h-80 w-80 rounded-full bg-gold-500/15 blur-3xl" />
      <Spark className="pointer-events-none absolute left-[10%] top-12 h-5 w-5 text-gold-300/50 animate-twinkle" />
      <Spark className="pointer-events-none absolute right-[14%] bottom-12 h-4 w-4 text-wine-300/50 animate-twinkle" style={{ animationDelay: '1.6s' }} />

      <div className="container-x relative">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="eyebrow-light justify-center">
            <Spark className="h-3 w-3" />
            Notre impact
            <Spark className="h-3 w-3" />
          </span>
          <h2 className="headline mt-4 text-3xl text-porcelain sm:text-4xl lg:text-[2.75rem]">
            Des résultats qui <span className="text-gold-300">engagent</span>
          </h2>
          <p className="mt-5 text-porcelain/60 sm:text-lg">
            Chiffres clés témoignant de notre engagement auprès des bénéficiaires.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-10 lg:grid-cols-4 lg:gap-6">
          {stats.map((s, i) => (
            <div key={s.label} className="relative">
              {i > 0 && (
                <Spark className="absolute -left-3 top-1/2 hidden h-3 w-3 -translate-y-1/2 text-gold-400/40 lg:block" />
              )}
              <Stat {...s} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
