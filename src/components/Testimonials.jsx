import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import Avatar from './Avatar'
import Spark from './Spark'

const testimonials = [
  {
    text: "Grâce à l'Association Étincelle, j'ai pu lancer mon activité et développer mon entreprise dans de bonnes conditions.",
    name: 'Jean Dupont',
    role: 'Entrepreneur',
  },
  {
    text: "Une équipe à l'écoute et un accompagnement très professionnel tout au long de mon projet.",
    name: 'Sophie Martin',
    role: 'Étudiante',
  },
  {
    text: 'Le processus a été simple et transparent. Je recommande vivement cette association.',
    name: 'Marc Bernard',
    role: 'Porteur de projet',
  },
]

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-ivory py-24 sm:py-28">
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-80 w-80 rounded-full bg-gold-200/50 blur-3xl" />
      <div className="container-x relative">
        <SectionHeading
          eyebrow="Témoignages"
          title={
            <>
              Ce que disent nos <span className="text-wine-600">bénéficiaires</span>
            </>
          }
          description="Découvrez les expériences de personnes accompagnées par l'Association Étincelle."
        />

        <div className="mt-14 grid gap-7 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100} variant="up">
              <figure className="card group flex h-full flex-col p-8">
                <div className="flex items-center justify-between">
                  <Spark className="h-6 w-6 text-wine-600/70 transition-transform duration-500 group-hover:rotate-90" />
                  <div className="flex gap-1 text-gold-500" aria-label="5 étoiles sur 5">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <i key={s} className="fa-solid fa-star text-xs" />
                    ))}
                  </div>
                </div>
                <blockquote className="mt-6 flex-1 font-display text-lg leading-relaxed text-ink/90">
                  « {t.text} »
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-4 border-t border-ink/8 pt-6">
                  <Avatar name={t.name} index={i} />
                  <span>
                    <span className="block font-bold text-ink">{t.name}</span>
                    <span className="block text-sm text-muted">{t.role}</span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
