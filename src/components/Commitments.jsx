import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const commitments = [
  { icon: 'fa-solid fa-shield-halved', title: 'Confidentialité', text: 'Vos données sont protégées et jamais cédées à des tiers sans votre accord.' },
  { icon: 'fa-solid fa-scale-balanced', title: 'Transparence', text: 'Des décisions claires, une gestion saine et un suivi ouvert de chaque dossier.' },
  { icon: 'fa-solid fa-users', title: 'Proximité', text: "Un accompagnement humain, à l'écoute, où que vous soyez." },
  { icon: 'fa-solid fa-bolt', title: 'Réactivité', text: 'Un traitement rapide de votre demande, avec un retour sous 48 heures.' },
]

export default function Commitments() {
  return (
    <section className="relative overflow-hidden bg-ivory py-24 sm:py-28">
      <div className="pointer-events-none absolute -top-24 right-0 h-80 w-80 rounded-full bg-wine-200/40 blur-3xl" />
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        {/* Visuel */}
        <Reveal variant="left" className="relative order-2 lg:order-1">
          <div className="pointer-events-none absolute -top-5 -left-5 h-full w-full rounded-frame border-2 border-wine-600/20" />
          <div className="frame relative aspect-[4/3] shadow-lift">
            <img src="/assets/opt/entretien.webp" alt="Entretien d'accompagnement avec un bénéficiaire" loading="lazy" decoding="async" />
          </div>
          <div className="absolute -bottom-7 -right-2 rounded-2xl border border-ink/5 bg-white p-5 shadow-lift sm:right-6">
            <p className="font-display text-3xl font-semibold text-wine-600">100%</p>
            <p className="text-sm font-semibold text-muted">Étude personnalisée</p>
          </div>
        </Reveal>

        {/* Texte + engagements */}
        <div className="order-1 lg:order-2">
          <Reveal variant="right">
            <SectionHeading
              center={false}
              eyebrow="Pourquoi nous faire confiance"
              title={
                <>
                  Une organisation <span className="text-wine-600">sérieuse</span>, à vos côtés
                </>
              }
              description="Notre rigueur et notre éthique guident chacune de nos actions auprès des bénéficiaires."
            />
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {commitments.map((c, i) => (
              <Reveal key={c.title} delay={i * 90} variant="up">
                <div className="group flex h-full items-start gap-4 rounded-2xl border border-ink/8 bg-white p-5 shadow-soft transition-all duration-500 hover:-translate-y-1 hover:border-wine-600/25 hover:shadow-lift">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-grad text-white shadow-soft transition-transform duration-500 group-hover:rotate-6">
                    <i className={c.icon} />
                  </span>
                  <span>
                    <span className="flex items-center gap-2 font-display text-lg font-semibold text-ink">
                      {c.title}
                    </span>
                    <span className="mt-1.5 block text-sm leading-relaxed text-muted">{c.text}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
