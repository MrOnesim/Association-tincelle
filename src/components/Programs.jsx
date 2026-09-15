import { Link } from 'react-router-dom'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import Spark from './Spark'

const programs = [
  {
    icon: 'fa-solid fa-graduation-cap',
    tile: 'bg-wine-100 text-wine-600',
    title: 'Aide aux études',
    text: 'Un soutien financier destiné aux étudiants pour leurs frais de formation et leur réussite.',
  },
  {
    icon: 'fa-solid fa-rocket',
    tile: 'bg-gold-100 text-gold-600',
    title: "Création d'entreprise",
    text: 'Un accompagnement des entrepreneurs pour lancer ou développer leur activité sereinement.',
  },
  {
    icon: 'fa-solid fa-house-chimney',
    tile: 'bg-emerald-100 text-emerald-600',
    title: 'Projet personnel',
    text: 'Un soutien pour réaliser des projets importants et améliorer votre quotidien.',
  },
  {
    icon: 'fa-solid fa-hand-holding-heart',
    tile: 'bg-sky-100 text-sky-600',
    title: 'Accompagnement',
    text: 'Un suivi personnalisé pour vous guider à chaque étape de votre parcours.',
  },
  {
    icon: 'fa-solid fa-users',
    tile: 'bg-rose-100 text-rose-600',
    title: 'Financement pour familles',
    text: 'Un financement non remboursable pour soutenir les familles : éducation, santé, logement et projets essentiels.',
  },
  {
    icon: 'fa-solid fa-hand-holding-medical',
    tile: 'bg-teal-100 text-teal-600',
    title: 'Personnes âgées et malades',
    text: "Une aide humaine et adaptée : soutien aux frais de santé, d'accompagnement et de confort quotidien, dans le respect et la dignité.",
  },
]

export default function Programs() {
  return (
    <section id="programmes" className="relative py-24 sm:py-28">
      <div className="container-x grid gap-14 lg:grid-cols-[1fr_1.55fr] lg:gap-16">
        {/* Colonne éditoriale collante */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal variant="left">
            <SectionHeading
              center={false}
              eyebrow="Nos programmes"
              title={
                <>
                  Des solutions pour <span className="text-wine-600">chaque besoin</span>
                </>
              }
              description="L'Association Étincelle accompagne particuliers, étudiants et entrepreneurs grâce à plusieurs dispositifs d'aide financière, pensés pour être simples et accessibles."
            />
            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/demande" className="btn-primary">
                Trouver mon dispositif
                <i className="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="mt-10 hidden items-center gap-3 text-sm font-semibold text-muted lg:flex">
              <Spark className="h-4 w-4 text-gold-500" />
              6 dispositifs · un seul interlocuteur de confiance
            </div>
          </Reveal>
        </div>

        {/* Grille de cartes */}
        <div className="grid gap-6 sm:grid-cols-2">
          {programs.map((p, i) => (
            <Reveal key={p.title} delay={i * 80} variant="up">
              <article className="card group h-full overflow-hidden p-7">
                <span className="pointer-events-none absolute right-6 top-6 font-display text-4xl font-semibold text-ink/6 transition group-hover:text-wine-600/12">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className={`grid h-14 w-14 place-items-center rounded-2xl ${p.tile} text-2xl transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6`}>
                  <i className={p.icon} />
                </span>
                <h3 className="mt-6 font-display text-xl font-semibold text-ink">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">{p.text}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest2 text-wine-600 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <Spark className="h-2.5 w-2.5" />
                  En savoir plus
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
