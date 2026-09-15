import { Link } from 'react-router-dom'
import Spark from './Spark'

export default function CtaBanner() {
  return (
    <section className="py-20 sm:py-24">
      <div className="container-x">
        <div className="grain relative overflow-hidden rounded-frame bg-ink-grad px-8 py-14 text-center text-porcelain shadow-ink-card sm:px-14 sm:py-20">
          <div className="pointer-events-none absolute -top-24 -right-16 h-80 w-80 rounded-full bg-wine-600/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-16 h-80 w-80 rounded-full bg-gold-500/20 blur-3xl" />
          <Spark className="pointer-events-none absolute left-[14%] top-10 h-5 w-5 text-gold-300/60 animate-twinkle" />
          <Spark className="pointer-events-none absolute right-[18%] bottom-12 h-4 w-4 text-wine-300/60 animate-twinkle" style={{ animationDelay: '1.4s' }} />

          <div className="relative mx-auto max-w-2xl">
            <span className="eyebrow-light justify-center">
              <Spark className="h-3 w-3" />
              Passez à l'action
            </span>
            <h2 className="headline mt-5 text-3xl text-porcelain sm:text-4xl lg:text-5xl">
              Prêt à faire <span className="underline-spark text-gold-300">étincelle</span> ?
            </h2>
            <p className="mt-5 leading-relaxed text-porcelain/70 sm:text-lg">
              Déposez votre demande en quelques minutes. Notre équipe vous accompagne avec
              transparence, confidentialité et bienveillance.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
              <Link to="/demande" className="btn-primary">
                Déposer une demande
                <i className="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link
                to="/faq"
                className="inline-flex items-center gap-2.5 rounded-full border border-white/20 px-7 py-3.5 text-sm font-bold text-porcelain/85 transition hover:-translate-y-0.5 hover:border-gold-400/60 hover:text-gold-300"
              >
                Consulter la FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
