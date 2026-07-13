import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const commitments = [
  { icon: 'fa-solid fa-shield-halved', title: 'Confidentialité', text: 'Vos données sont protégées et jamais cédées à des tiers sans votre accord.' },
  { icon: 'fa-solid fa-scale-balanced', title: 'Transparence', text: 'Des décisions claires, une gestion saine et un suivi ouvert de chaque dossier.' },
  { icon: 'fa-solid fa-users', title: 'Proximité', text: 'Un accompagnement humain, à l\'écoute, où que vous soyez.' },
  { icon: 'fa-solid fa-bolt', title: 'Réactivité', text: 'Un traitement rapide de votre demande, avec un retour sous 48 heures.' },
]

export default function Commitments() {
  return (
    <section className="py-20 bg-white">
      <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
        <div className="relative">
          <img
            src="/assets/entretien.png"
            alt="Entretien d'accompagnement avec un bénéficiaire"
            className="rounded-3xl shadow-xl w-full h-[460px] object-cover"
          />
          <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl hidden md:block">
            <p className="text-primary font-bold text-3xl">100%</p>
            <p className="text-slate-600">Étude personnalisée</p>
          </div>
        </div>

        <div>
          <span className="eyebrow">Pourquoi nous faire confiance</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
            Une organisation sérieuse, à vos côtés
          </h2>
          <p className="mt-4 text-slate-600 leading-relaxed">
            Notre rigueur et notre éthique guident chacune de nos actions auprès des bénéficiaires.
          </p>

          <div className="grid sm:grid-cols-2 gap-5 mt-8">
            {commitments.map((c, i) => (
              <Reveal key={c.title} delay={i * 100}>
                <div
                  className="flex items-start gap-4 p-5 rounded-2xl border border-slate-100 hover:border-primary/30 hover:shadow-md transition h-full"
                >
                <div className="w-11 h-11 shrink-0 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-lg">
                  <i className={c.icon}></i>
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{c.title}</h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">{c.text}</p>
                </div>
              </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
