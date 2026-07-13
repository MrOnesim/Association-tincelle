import SectionHeading from './SectionHeading'

const services = [
  { icon: 'fa-solid fa-lightbulb', title: 'Financement Projet', text: 'Développez vos ambitions grâce à un soutien financier adapté.' },
  { icon: 'fa-solid fa-graduation-cap', title: 'Études', text: 'Investissez dans votre avenir et concrétisez vos objectifs académiques.' },
  { icon: 'fa-solid fa-rocket', title: 'Entrepreneuriat', text: 'Lancez ou développez votre activité avec notre accompagnement.' },
  { icon: 'fa-solid fa-hand-holding-heart', title: 'Accompagnement', text: 'Un suivi personnalisé pour chaque étape de votre projet.' },
]

export default function About() {
  return (
    <section id="apropos" className="py-24 bg-slate-50">
      <div className="container-x grid lg:grid-cols-2 gap-14 items-center">
        <div className="relative">
          <img
            src="/assets/beneficiaire IA.png"
            alt="Bénéficiaires Association Étincelle"
            className="rounded-3xl shadow-xl w-full h-[420px] object-cover"
          />
          <img
            src="/assets/couple.png"
            alt="Un couple accompagné par l'association"
            className="absolute -bottom-6 -right-3 sm:-right-8 w-36 h-36 sm:w-44 sm:h-44 object-cover rounded-2xl shadow-lg border-4 border-white"
          />
          <div className="absolute -top-5 -left-5 bg-white rounded-2xl shadow-lg p-5 hidden sm:block">
            <p className="text-3xl font-extrabold text-primary">+15</p>
            <p className="text-sm text-slate-500">pays accompagnés</p>
          </div>
        </div>

        <div>
          <span className="eyebrow">À propos</span>
          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900 leading-tight">
            Une association au service de votre autonomie
          </h2>

          <p className="mt-6 text-slate-600 leading-relaxed">
            L'Association Étincelle accompagne les particuliers, entrepreneurs, étudiants et porteurs
            de projets grâce à des solutions financières accessibles, transparentes et adaptées à
            leurs besoins.
          </p>

          <p className="mt-4 text-slate-600 leading-relaxed">
            Notre mission est de favoriser l'autonomie, l'inclusion sociale et le développement
            durable en proposant un accompagnement personnalisé à chaque étape de votre parcours.
          </p>

          <div className="grid sm:grid-cols-2 gap-5 mt-10">
            {services.map((s) => (
              <div key={s.title} className="card p-6">
                <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-lg mb-3">
                  <i className={s.icon}></i>
                </div>
                <h3 className="font-bold text-slate-900">{s.title}</h3>
                <p className="text-slate-600 mt-1.5 text-sm leading-relaxed">{s.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
