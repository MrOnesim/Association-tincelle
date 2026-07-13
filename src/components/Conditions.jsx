import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const conditions = [
  { title: 'Identité vérifiée', text: 'Fournir une pièce d\'identité valide permettant de confirmer votre demande.' },
  { title: 'Projet clairement défini', text: 'Présenter un besoin précis ou un projet nécessitant un accompagnement financier.' },
  { title: 'Documents justificatifs', text: 'Transmettre les documents nécessaires à l\'analyse de votre dossier.' },
  { title: 'Informations fiables', text: 'Communiquer des coordonnées exactes afin de faciliter les échanges.' },
  { title: 'Respect des engagements', text: 'Accepter les règles et principes de fonctionnement de l\'association.' },
]

export default function Conditions() {
  return (
    <section id="conditions" className="py-24 bg-white">
      <div className="container-x">
        <SectionHeading
          eyebrow="Conditions"
          title="Pour bénéficier de notre accompagnement"
          description="Découvrez les critères nécessaires pour présenter votre demande d'aide auprès de l'Association Étincelle."
        />

        <div className="grid lg:grid-cols-2 gap-14 items-center mt-12">
          <div className="relative">
            <img
              src="/assets/B Assis.png"
              alt="Accompagnement des bénéficiaires"
              className="rounded-3xl shadow-xl w-full object-cover"
            />
            <div className="absolute -bottom-6 -right-2 sm:right-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block">
              <p className="text-primary font-bold text-3xl">100%</p>
              <p className="text-slate-600">Étude personnalisée</p>
            </div>
          </div>

          <div>
            <div className="space-y-4">
              {conditions.map((c, i) => (
                <Reveal key={c.title} delay={i * 80}>
                  <div className="flex gap-4 bg-slate-50 p-5 rounded-2xl border border-slate-100">
                  <div className="w-9 h-9 shrink-0 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                    <i className="fa-solid fa-circle-check"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">{c.title}</h3>
                    <p className="text-slate-600 text-sm mt-1">{c.text}</p>
                  </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
