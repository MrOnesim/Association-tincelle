import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const programs = [
  {
    icon: 'fa-solid fa-graduation-cap',
    bg: 'bg-pink-50 text-primary',
    title: 'Aide aux études',
    text: 'Un soutien financier destiné aux étudiants pour leurs frais de formation et leur réussite.',
  },
  {
    icon: 'fa-solid fa-rocket',
    bg: 'bg-amber-50 text-accent',
    title: 'Création d\'entreprise',
    text: 'Un accompagnement des entrepreneurs pour lancer ou développer leur activité sereinement.',
  },
  {
    icon: 'fa-solid fa-house-chimney',
    bg: 'bg-emerald-50 text-emerald-600',
    title: 'Projet personnel',
    text: 'Un soutien pour réaliser des projets importants et améliorer votre quotidien.',
  },
  {
    icon: 'fa-solid fa-hand-holding-heart',
    bg: 'bg-sky-50 text-sky-600',
    title: 'Accompagnement',
    text: 'Un suivi personnalisé pour vous guider à chaque étape de votre parcours.',
  },
  {
    icon: 'fa-solid fa-users',
    bg: 'bg-rose-50 text-rose-600',
    title: 'Financement pour familles',
    text: 'Un financement non remboursable pour soutenir les familles : éducation, santé, logement et projets essentiels, sans aucun remboursement à charge.',
  },
]

export default function Programs() {
  return (
    <section id="programmes" className="py-24 bg-slate-50">
      <div className="container-x">
        <SectionHeading
          eyebrow="Nos programmes"
          title="Des solutions adaptées à chaque besoin"
          description="L'Association Étincelle accompagne les particuliers, étudiants et entrepreneurs grâce à plusieurs dispositifs d'aide financière."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {programs.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="card p-8 h-full">
                <div className={`w-14 h-14 ${p.bg} rounded-2xl flex items-center justify-center text-2xl`}>
                  <i className={p.icon}></i>
                </div>
                <h3 className="text-lg font-bold mt-6 text-slate-900">{p.title}</h3>
                <p className="text-slate-600 mt-3 text-sm leading-relaxed">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
