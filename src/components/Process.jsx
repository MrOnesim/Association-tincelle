import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const steps = [
  { icon: 'fa-solid fa-file-signature', bg: 'bg-pink-50 text-primary', label: 'Étape 1', title: 'Déposer une demande', text: 'Complétez le formulaire en ligne avec les informations demandées.' },
  { icon: 'fa-solid fa-magnifying-glass', bg: 'bg-amber-50 text-accent', label: 'Étape 2', title: 'Analyse du dossier', text: 'Nos équipes examinent votre situation et vos besoins.' },
  { icon: 'fa-solid fa-circle-check', bg: 'bg-emerald-50 text-emerald-600', label: 'Étape 3', title: 'Validation', text: 'Après étude, nous vous informons de la décision.' },
  { icon: 'fa-solid fa-hands-holding', bg: 'bg-sky-50 text-sky-600', label: 'Étape 4', title: 'Accompagnement', text: 'Vous bénéficiez de l\'aide et d\'un suivi personnalisé.' },
  { icon: 'fa-solid fa-receipt', bg: 'bg-violet-50 text-violet-600', label: 'Étape 5', title: 'Frais d\'établissement', text: 'Des frais uniques sont requis pour l\'établissement de votre dossier. Après paiement, votre demande est traitée rapidement.' },
]

export default function Process() {
  return (
    <section className="py-24 bg-white">
      <div className="container-x">
        <SectionHeading
          eyebrow="Processus"
          title="Obtenir une aide n'a jamais été aussi simple"
          description="Notre procédure est conçue pour être rapide, transparente et accessible à tous."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-8">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 100} className="relative text-center">
              <div className={`w-20 h-20 mx-auto ${s.bg} rounded-full flex items-center justify-center text-2xl`}>
                <i className={s.icon}></i>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-1/2 w-full h-0.5 bg-slate-100"></div>
              )}
              <div className="mt-6">
                <span className="text-primary font-bold text-sm">{s.label}</span>
                <h3 className="font-bold text-lg mt-1 text-slate-900">{s.title}</h3>
                <p className="text-slate-600 mt-2 text-sm">{s.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
