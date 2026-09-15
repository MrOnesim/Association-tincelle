import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import Spark from './Spark'

const services = [
  { icon: 'fa-solid fa-lightbulb', title: 'Financement Projet', text: 'Développez vos ambitions grâce à un soutien financier adapté.' },
  { icon: 'fa-solid fa-graduation-cap', title: 'Études', text: 'Investissez dans votre avenir et concrétisez vos objectifs académiques.' },
  { icon: 'fa-solid fa-rocket', title: 'Entrepreneuriat', text: 'Lancez ou développez votre activité avec notre accompagnement.' },
  { icon: 'fa-solid fa-hand-holding-heart', title: 'Accompagnement', text: 'Un suivi personnalisé pour chaque étape de votre projet.' },
]

export default function About() {
  return (
    <section id="apropos" className="relative overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-wine-200/40 blur-3xl" />
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        {/* Collage visuel */}
        <Reveal variant="left" className="relative">
          <div className="frame relative aspect-[4/3.4] shadow-lift">
            <img src="/assets/opt/beneficiaire-ia.webp" alt="Bénéficiaires de l'Association Étincelle" loading="lazy" decoding="async" />
          </div>
          <div className="frame absolute -bottom-8 -right-2 aspect-square w-36 border-4 border-porcelain shadow-lift sm:-right-6 sm:w-44">
            <img src="/assets/opt/couple.webp" alt="Un couple accompagné par l'association" loading="lazy" decoding="async" />
          </div>
          <div className="absolute -top-6 -left-3 rounded-2xl border border-ink/5 bg-white p-5 shadow-lift sm:-left-6">
            <p className="font-display text-3xl font-semibold text-wine-600">+15</p>
            <p className="text-sm font-semibold text-muted">pays accompagnés</p>
          </div>
        </Reveal>

        {/* Texte + services */}
        <div>
          <Reveal variant="right">
            <SectionHeading
              center={false}
              eyebrow="À propos"
              title={
                <>
                  Au service de votre <span className="text-wine-600">autonomie</span>
                </>
              }
              description="L'Association Étincelle accompagne particuliers, entrepreneurs, étudiants et porteurs de projets grâce à des solutions financières accessibles, transparentes et adaptées. Notre mission : favoriser l'autonomie, l'inclusion sociale et le développement durable."
            />
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={i * 90} variant="up">
                <div className="card group h-full p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-wine-100 text-wine-600 transition-all duration-500 group-hover:bg-brand-grad group-hover:text-white">
                    <i className={s.icon} />
                  </span>
                  <h3 className="mt-4 flex items-center gap-2 font-display text-lg font-semibold text-ink">
                    {s.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={200} variant="up" className="mt-8 flex items-center gap-3 text-sm font-semibold text-muted">
            <Spark className="h-4 w-4 text-gold-500" />
            Transparence · Confiance · Solidarité
          </Reveal>
        </div>
      </div>
    </section>
  )
}
