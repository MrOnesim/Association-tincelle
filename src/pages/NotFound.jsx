import { Link } from 'react-router-dom'
import Spark from '../components/Spark'

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[70vh] items-center overflow-hidden bg-ink-grad py-32 text-porcelain">
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-wine-600/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-gold-500/15 blur-3xl" />
      <Spark className="pointer-events-none absolute left-[16%] top-1/4 h-6 w-6 text-gold-300/60 animate-twinkle" />
      <Spark className="pointer-events-none absolute right-[20%] bottom-1/4 h-4 w-4 text-wine-300/60 animate-twinkle" style={{ animationDelay: '1.3s' }} />

      <div className="container-x relative text-center">
        <p className="font-display text-8xl font-semibold text-gold-300 sm:text-9xl">404</p>
        <h1 className="headline mt-4 text-3xl text-porcelain sm:text-4xl">Page introuvable</h1>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-porcelain/60">
          La page que vous recherchez n'existe pas ou a été déplacée. Revenons vers la lumière.
        </p>
        <Link to="/" className="btn-primary mt-9 inline-flex">
          Retour à l'accueil
          <i className="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>
    </section>
  )
}
