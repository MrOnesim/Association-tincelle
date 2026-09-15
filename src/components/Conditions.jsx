import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const conditions = [
  { title: 'Identité vérifiée', text: "Fournir une pièce d'identité valide permettant de confirmer votre demande." },
  { title: 'Projet clairement défini', text: 'Présenter un besoin précis ou un projet nécessitant un accompagnement financier.' },
  { title: 'Documents justificatifs', text: "Transmettre les documents nécessaires à l'analyse de votre dossier." },
  { title: 'Informations fiables', text: 'Communiquer des coordonnées exactes afin de faciliter les échanges.' },
  { title: 'Respect des engagements', text: 'Accepter les règles et principes de fonctionnement de l\'association.' },
]

export default function Conditions() {
  return (
    <section id="conditions" className="relative py-24 sm:py-28">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        {/* Visuel */}
        <Reveal variant="left" className="relative order-2 lg:order-1">
          <div className="pointer-events-none absolute -bottom-5 -left-5 h-full w-full rounded-frame border-2 border-gold-400/40" />
          <div className="frame relative aspect-[4/3.4] shadow-lift">
            <img src="/assets/opt/b-assis.webp" alt="Accompagnement des bénéficiaires" loading="lazy" decoding="async" />
          </div>
          <div className="absolute -top-6 -right-2 rounded-2xl border border-ink/5 bg-white p-5 shadow-lift sm:right-6">
            <p className="font-display text-3xl font-semibold text-wine-600">100%</p>
            <p className="text-sm font-semibold text-muted">Étude personnalisée</p>
          </div>
        </Reveal>

        {/* Liste des conditions */}
        <div className="order-1 lg:order-2">
          <Reveal variant="right">
            <SectionHeading
              center={false}
              eyebrow="Conditions"
              title={
                <>
                  Pour bénéficier de <span className="text-wine-600">notre accompagnement</span>
                </>
              }
              description="Découvrez les critères nécessaires pour présenter votre demande d'aide auprès de l'Association Étincelle."
            />
          </Reveal>

          <div className="mt-10 space-y-4">
            {conditions.map((c, i) => (
              <Reveal key={c.title} delay={i * 80} variant="right">
                <div className="group flex gap-4 rounded-2xl border border-ink/8 bg-white p-5 shadow-soft transition-all duration-500 hover:-translate-x-0 hover:border-wine-600/25 hover:shadow-lift">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-brand-grad text-white shadow-soft">
                    <i className="fa-solid fa-circle-check text-sm" />
                  </span>
                  <span>
                    <span className="flex items-baseline gap-2.5 font-display text-lg font-semibold text-ink">
                      <span className="font-display text-sm text-wine-600/60">{String(i + 1).padStart(2, '0')}</span>
                      {c.title}
                    </span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">{c.text}</span>
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
