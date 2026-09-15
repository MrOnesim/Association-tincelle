import Spark from './Spark'

/**
 * Bandeau d'en-tête de page : encre profonde + grain + halos,
 * titre en display serif, étincelles scintillantes.
 */
export default function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="grain relative overflow-hidden bg-ink-grad text-porcelain">
      {/* Halos ambiants */}
      <div className="pointer-events-none absolute -top-28 -right-24 h-96 w-96 rounded-full bg-wine-600/25 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-24 h-96 w-96 rounded-full bg-gold-500/15 blur-3xl" />
      {/* Étincelles décoratives */}
      <Spark className="pointer-events-none absolute left-[12%] top-10 h-5 w-5 text-gold-300/70 animate-twinkle" />
      <Spark className="pointer-events-none absolute right-[16%] top-24 h-3.5 w-3.5 text-wine-300/70 animate-twinkle" style={{ animationDelay: '1.2s' }} />
      <Spark className="pointer-events-none absolute right-[34%] bottom-8 h-4 w-4 text-gold-200/50 animate-twinkle" style={{ animationDelay: '2s' }} />

      <div className="container-x relative py-20 sm:py-24">
        <div className="animate-rise">
          {eyebrow && (
            <span className="eyebrow-light">
              <Spark className="h-3 w-3" />
              {eyebrow}
            </span>
          )}
          <h1 className="headline mt-5 max-w-3xl text-4xl text-porcelain sm:text-5xl lg:text-6xl">
            {title}
          </h1>
          {description && (
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-porcelain/70 sm:text-lg">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Liseré doré en bas de bandeau */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />
    </section>
  )
}
