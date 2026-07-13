import { useEffect, useRef, useState } from 'react'

function useCounter(end, duration = 2000) {
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
            setValue(Math.floor(progress * end))
            if (progress < 1) requestAnimationFrame(tick)
            else setValue(end)
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
    <div ref={ref} className="text-center">
      <h3 className="text-5xl font-extrabold">{value.toLocaleString() + suffix}</h3>
      <p className="mt-3 text-pink-100">{label}</p>
    </div>
  )
}

export default function Stats() {
  return (
    <section className="py-24 bg-primary text-white relative overflow-hidden">
      <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="container-x relative">
        <div className="text-center mb-16">
          <span className="eyebrow text-white/80">Notre impact</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold">Des résultats qui engagent</h2>
          <p className="mt-4 text-pink-100">
            Chiffres clés témoignant de notre engagement auprès des bénéficiaires.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
          <Stat end={2500} suffix="+" label="Bénéficiaires" />
          <Stat end={5000000} suffix="€" label="Fonds accordés" />
          <Stat end={98} suffix="%" label="Satisfaction" />
          <Stat end={15} suffix="+" label="Pays accompagnés" />
        </div>
      </div>
    </section>
  )
}
