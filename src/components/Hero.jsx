import { Link } from 'react-router-dom'
import Spark from './Spark'

const stats = [
  { value: '2500+', label: 'Bénéficiaires accompagnés' },
  { value: '5 M€', label: 'De fonds accordés' },
  { value: '98%', label: 'De satisfaction' },
]

const trust = [
  { icon: 'fa-solid fa-lock', text: 'Données sécurisées' },
  { icon: 'fa-solid fa-clock', text: 'Réponse sous 48 h' },
  { icon: 'fa-solid fa-shield-heart', text: '100 % confidentiel' },
]

export default function Hero() {
  return (
    <section className="grain relative overflow-hidden">
      {/* Halos ambiants chauds */}
      <div className="pointer-events-none absolute -top-32 -right-24 h-[28rem] w-[28rem] rounded-full bg-wine-200/50 blur-3xl" />
      <div className="pointer-events-none absolute top-1/3 -left-32 h-96 w-96 rounded-full bg-gold-200/50 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-wine-300/50 to-transparent" />

      {/* Étincelles scintillantes */}
      <Spark className="pointer-events-none absolute left-[8%] top-24 h-6 w-6 text-gold-400/60 animate-twinkle" />
      <Spark className="pointer-events-none absolute right-[10%] top-40 h-4 w-4 text-wine-400/60 animate-twinkle" style={{ animationDelay: '1.1s' }} />
      <Spark className="pointer-events-none absolute left-[46%] bottom-16 h-5 w-5 text-wine-300/50 animate-twinkle" style={{ animationDelay: '2.2s' }} />

      <div className="container-x relative grid items-center gap-14 py-16 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
        {/* Colonne texte */}
        <div>
          <span className="animate-rise inline-flex items-center gap-2 rounded-full border border-wine-600/20 bg-white/70 px-4 py-1.5 text-xs font-bold uppercase tracking-widest2 text-wine-600 backdrop-blur">
            <Spark className="h-3 w-3" />
            Organisation à but non lucratif
          </span>

          <h1 className="headline mt-7 text-4xl sm:text-5xl lg:text-6xl" style={{ animationDelay: '0.08s' }}>
            <span className="animate-rise block">
              Faites <span className="underline-spark text-wine-600">étincelle</span>
            </span>
            <span className="animate-rise block" style={{ animationDelay: '0.16s' }}>
              dans vos projets de vie
            </span>
          </h1>

          <p className="animate-rise mt-7 max-w-xl text-lg leading-relaxed text-muted" style={{ animationDelay: '0.24s' }}>
            L'Association Étincelle soutient étudiants, entrepreneurs et familles grâce à un
            accompagnement financier transparent, équitable et profondément humain.
            Parce que votre liberté financière est notre objectif.
          </p>

          <div className="animate-rise mt-9 flex flex-wrap gap-4" style={{ animationDelay: '0.32s' }}>
            <Link to="/demande" className="btn-primary">
              Déposer une demande
              <i className="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link to="/apropos" className="btn-outline">
              Nous découvrir
            </Link>
          </div>

          <div className="animate-rise mt-10 flex flex-wrap gap-x-7 gap-y-4" style={{ animationDelay: '0.4s' }}>
            {trust.map((t) => (
              <div key={t.text} className="flex items-center gap-2.5 text-sm font-semibold text-ink/80">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-wine-100 text-wine-600">
                  <i className={`${t.icon} text-xs`} />
                </span>
                {t.text}
              </div>
            ))}
          </div>
        </div>

        {/* Colonne visuelle */}
        <div className="animate-rise relative" style={{ animationDelay: '0.2s' }}>
          {/* Cadre doré décalé */}
          <div className="pointer-events-none absolute -bottom-5 -right-5 h-full w-full rounded-frame border-2 border-gold-400/40" />

          <div className="frame relative aspect-[4/5] shadow-lift sm:aspect-[5/5] lg:aspect-[4/4.4]">
            <img
              src="/assets/opt/siege.webp"
              alt="Siège de l'Association Étincelle"
              className="animate-kenburns"
              loading="eager"
              decoding="async"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
          </div>

          {/* Badge conformité */}
          <div className="animate-floaty absolute -bottom-7 -left-3 flex items-center gap-3.5 rounded-2xl border border-ink/5 bg-white/90 p-4 shadow-lift backdrop-blur sm:left-6">
            <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-400 text-white">
              <i className="fa-solid fa-circle-check" />
            </span>
            <span>
              <span className="block text-sm font-bold text-ink">Association déclarée</span>
              <span className="block text-xs text-muted">Immatriculée &amp; conforme</span>
            </span>
          </div>

          {/* Carte statistiques */}
          <div className="absolute -top-6 -right-2 rounded-2xl border border-white/40 bg-ink/85 p-4 shadow-ink-card backdrop-blur sm:right-6">
            <div className="grid grid-cols-3 gap-5 text-center">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="font-display text-xl font-semibold text-gold-300">{s.value}</p>
                  <p className="mt-0.5 text-[10px] leading-tight text-porcelain/60">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
