import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import Spark from './Spark'

const steps = [
  { icon: 'fa-solid fa-file-signature', title: 'Déposer une demande', text: 'Complétez le formulaire en ligne avec les informations demandées.' },
  { icon: 'fa-solid fa-magnifying-glass', title: 'Analyse du dossier', text: 'Nos équipes examinent votre situation et vos besoins.' },
  { icon: 'fa-solid fa-circle-check', title: 'Validation', text: 'Après étude, nous vous informons de la décision.' },
  { icon: 'fa-solid fa-hands-holding', title: 'Accompagnement', text: "Vous bénéficiez de l'aide et d'un suivi personnalisé." },
  { icon: 'fa-solid fa-receipt', title: "Frais d'établissement", text: 'Des frais uniques sont requis pour l\'établissement de votre dossier. Après paiement, votre demande est traitée rapidement.', highlight: true },
]

export default function Process() {
  return (
    <section className="grain relative overflow-hidden bg-ink-grad py-24 text-porcelain sm:py-28">
      <div className="pointer-events-none absolute -top-24 left-1/4 h-80 w-80 rounded-full bg-wine-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-1/4 h-80 w-80 rounded-full bg-gold-500/15 blur-3xl" />

      <div className="container-x relative">
        <SectionHeading
          light
          eyebrow="Processus"
          title={
            <>
              Obtenir une aide, <span className="text-gold-300">pas à pas</span>
            </>
          }
          description="Notre procédure est conçue pour être rapide, transparente et accessible à tous."
        />

        <div className="relative mt-16">
          {/* Ligne de connexion */}
          <div className="pointer-events-none absolute left-0 right-0 top-10 hidden h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent lg:block" />

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 110} variant="up" className="relative text-center">
                <div className="relative mx-auto grid h-20 w-20 place-items-center">
                  <span
                    className={`grid h-20 w-20 place-items-center rounded-full text-2xl shadow-ink-card ring-4 transition-transform duration-500 hover:scale-105 ${
                      s.highlight
                        ? 'bg-gold-grad text-ink ring-gold-400/30'
                        : 'bg-ink-soft text-gold-300 ring-wine-600/30'
                    }`}
                  >
                    <i className={s.icon} />
                  </span>
                  <span className="absolute -right-1 -top-1 grid h-7 w-7 place-items-center rounded-full bg-brand-grad font-display text-xs font-semibold text-white shadow-soft">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-6 font-display text-lg font-semibold text-porcelain">{s.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-porcelain/60">{s.text}</p>
                {s.highlight && (
                  <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-gold-400/15 px-3 py-1 text-[11px] font-bold uppercase tracking-widest2 text-gold-300">
                    <Spark className="h-2.5 w-2.5" />
                    Information importante
                  </span>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
