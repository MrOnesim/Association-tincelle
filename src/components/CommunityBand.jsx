import Spark from './Spark'

/** Grande bande visuelle « communauté » avec voile dégradé de marque. */
export default function CommunityBand() {
  return (
    <section className="py-16 sm:py-20">
      <div className="container-x">
        <div className="frame relative aspect-[16/9] shadow-ink-card sm:aspect-[21/9]">
          <img
            src="/assets/opt/famille-ia.webp"
            alt="La communauté de l'Association Étincelle"
            className="animate-kenburns"
            loading="lazy"
            decoding="async"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-wine-800/60 to-transparent" />
          <Spark className="pointer-events-none absolute right-[12%] top-8 h-6 w-6 text-gold-300/70 animate-twinkle" />

          <div className="absolute inset-0 flex items-center">
            <div className="max-w-xl px-8 text-porcelain sm:px-14">
              <span className="eyebrow-light">
                <Spark className="h-3 w-3" />
                Notre communauté
              </span>
              <h2 className="headline mt-4 text-3xl text-porcelain sm:text-4xl lg:text-5xl">
                Une communauté qui <span className="text-gold-300">avance ensemble</span>
              </h2>
              <p className="mt-5 leading-relaxed text-porcelain/80">
                Chaque bénéficiaire compte. Nous bâtissons, avec vous, des parcours durables,
                autonomes et porteurs de sens.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
