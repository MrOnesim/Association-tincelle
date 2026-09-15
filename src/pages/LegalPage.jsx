import PageHeader from '../components/PageHeader'
import Reveal from '../components/Reveal'
import Spark from '../components/Spark'

export default function LegalPage({ eyebrow, title, intro, sections }) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} description={intro} />
      <section className="relative py-16 sm:py-20">
        <div className="container-x max-w-3xl space-y-10">
          {sections.map((s, i) => (
            <Reveal key={i} delay={i * 60} variant="up">
              <div className="relative border-l-2 border-wine-600/25 pl-6 transition-colors hover:border-wine-600/60">
                <Spark className="absolute -left-[7px] top-1.5 h-3 w-3 text-wine-600" />
                <h2 className="font-display text-2xl font-semibold text-ink">{s.h}</h2>
                <div className="mt-3 space-y-3 leading-relaxed text-muted">
                  {Array.isArray(s.p) ? s.p.map((para, j) => <p key={j}>{para}</p>) : <p>{s.p}</p>}
                </div>
              </div>
            </Reveal>
          ))}
          <p className="border-t border-ink/10 pt-6 text-sm text-muted/70">
            Ce document est fourni à titre indicatif et doit être adapté puis validé par un conseil juridique.
          </p>
        </div>
      </section>
    </>
  )
}
