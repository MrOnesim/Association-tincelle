import { Link } from 'react-router-dom'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import Spark from './Spark'
import SmartImage from './SmartImage'

const values = [
  { icon: 'fa-solid fa-hand-holding-heart', title: 'Solidarité', text: "Chaque dossier est étudié avec bienveillance et sans jugement." },
  { icon: 'fa-solid fa-scale-balanced', title: 'Transparence', text: 'Des décisions collégiales, tracées et expliquées.' },
  { icon: 'fa-solid fa-user-shield', title: 'Professionnalisme', text: 'Une équipe pluridisciplinaire, rigoureuse et disponible.' },
]

/**
 * Section « Notre équipe » — met en avant la vraie photo d'équipe.
 * La photo est attendue dans `public/assets/equipe.jpeg` ; à défaut,
 * un visuel de repli s'affiche (SmartImage) sans casser la mise en page.
 */
export default function Team() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-gold-200/50 blur-3xl" />
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        {/* Photo d'équipe */}
        <Reveal variant="left" className="relative">
          <div className="pointer-events-none absolute -bottom-5 -right-5 h-full w-full rounded-frame border-2 border-wine-600/20" />
          <div className="frame relative aspect-[4/3] shadow-lift">
            <SmartImage
              src="/assets/equipe.jpeg"
              alt="Réunion de l'équipe de l'Association Étincelle"
              className="h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-5">
              <p className="flex items-center gap-2 text-sm font-semibold text-porcelain">
                <Spark className="h-3 w-3 text-gold-300" />
                Réunion d'équipe — Association Étincelle
              </p>
            </div>
          </div>
        </Reveal>

        {/* Texte + valeurs */}
        <div>
          <Reveal variant="right">
            <SectionHeading
              center={false}
              eyebrow="Notre équipe"
              title={
                <>
                  Des <span className="text-wine-600">visages</span> derrière chaque décision
                </>
              }
              description="Ensemble, contribuons en avant : meilleur grâce à la solidarité et à l'entraide. Voici les femmes et les hommes qui étudient votre dossier et vous accompagnent."
            />
          </Reveal>

          <div className="mt-9 space-y-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 90} variant="right">
                <div className="group flex items-start gap-4 rounded-2xl border border-ink/8 bg-white p-5 shadow-soft transition-all duration-500 hover:border-wine-600/25 hover:shadow-lift">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-grad text-white shadow-soft transition-transform duration-500 group-hover:rotate-6">
                    <i className={v.icon} />
                  </span>
                  <span>
                    <span className="block font-display text-lg font-semibold text-ink">{v.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">{v.text}</span>
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={220} variant="up" className="mt-8">
            <Link to="/apropos" className="btn-outline">
              Découvrir l'association
              <i className="fa-solid fa-arrow-right" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
