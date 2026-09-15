import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import Spark from './Spark'

const partners = [
  { icon: 'fa-solid fa-hand-holding-heart', title: 'ONG', text: 'Programmes humanitaires, éducation, santé et inclusion sociale.' },
  { icon: 'fa-solid fa-building', title: 'Entreprises', text: 'RSE, entrepreneuriat, innovation sociale et insertion professionnelle.' },
  { icon: 'fa-solid fa-landmark', title: 'Fondations', text: 'Financement de projets à impact durable et mesurable.' },
]

const sectors = ['Éducation', 'Santé', 'Logement', 'Insertion', 'Entrepreneuriat', 'Solidarité']

export default function Partners() {
  return (
    <section id="partenariats" className="relative py-24 sm:py-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Partenariats"
          title={
            <>
              Ils construisent <span className="text-wine-600">avec nous</span>
            </>
          }
          description="Nous collaborons avec des acteurs engagés pour amplifier notre impact sur le terrain."
        />

        <div className="mt-14 grid gap-7 md:grid-cols-3">
          {partners.map((p, i) => (
            <Reveal key={p.title} delay={i * 100} variant="up">
              <article className="card group relative h-full overflow-hidden p-8">
                <span className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-wine-100/70 transition-transform duration-700 group-hover:scale-150" />
                <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-brand-grad text-white shadow-soft transition-transform duration-500 group-hover:-rotate-6">
                  <i className={`${p.icon} text-xl`} />
                </span>
                <h3 className="relative mt-6 font-display text-2xl font-semibold text-ink">{p.title}</h3>
                <p className="relative mt-3 leading-relaxed text-muted">{p.text}</p>
                <span className="relative mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest2 text-wine-600">
                  <Spark className="h-2.5 w-2.5" />
                  Devenir partenaire
                </span>
              </article>
            </Reveal>
          ))}
        </div>

        {/* Bande de secteurs */}
        <Reveal delay={150} variant="up" className="mt-12">
          <div className="flex flex-wrap items-center justify-center gap-3">
            {sectors.map((s) => (
              <span
                key={s}
                className="rounded-full border border-ink/10 bg-white/70 px-5 py-2 text-sm font-semibold text-ink/70 backdrop-blur transition hover:-translate-y-0.5 hover:border-wine-600/40 hover:text-wine-600"
              >
                {s}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
