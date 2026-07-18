const stats = [
  { value: '2500+', label: 'Bénéficiaires accompagnés' },
  { value: '5M€', label: 'De fonds accordés' },
  { value: '98%', label: 'De satisfaction' },
]

import { Link } from 'react-router-dom'

const trust = [
  { icon: 'fa-solid fa-lock', text: 'Données sécurisées' },
  { icon: 'fa-solid fa-clock', text: 'Réponse sous 48h' },
  { icon: 'fa-solid fa-shield-heart', text: '100% confidentiel' },
]

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fff5f8] via-white to-white pt-12 pb-24">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute top-40 -left-24 w-80 h-80 bg-accent/10 rounded-full blur-3xl"></div>

      <div className="container-x grid lg:grid-cols-2 gap-14 items-center relative animate-hero">
        <div className="animate-hero">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-4 py-1.5 text-sm font-semibold">
            <i className="fa-solid fa-certificate"></i>
            Organisation à but non lucratif
          </span>

          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold leading-tight text-slate-900">
            L'<span className="gradient-text">Association Étincelle</span> accompagne vos projets
          </h1>

          <p className="mt-6 text-lg text-slate-600 leading-relaxed">
            Nous soutenons étudiants, entrepreneurs et familles grâce à un accompagnement financier
            transparent, équitable et humain. Parce que votre liberté financière est notre mission.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link to="/demande" className="btn-primary">
              Déposer une demande
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
            <Link to="/apropos" className="btn-outline">
              Nous découvrir
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-4">
            {trust.map((t) => (
              <div key={t.text} className="flex items-center gap-2 text-slate-700">
                <i className={`${t.icon} text-primary`}></i>
                <span className="text-sm font-medium">{t.text}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative animate-hero" style={{ animationDelay: '0.15s' }}>
          <div className="rounded-3xl overflow-hidden shadow-2xl border border-white">
            <img
              src="/assets/siege (2).png"
              alt="Siège de l'Association Étincelle"
              className="w-full h-[460px] object-cover"
            />
          </div>

          <div className="absolute -bottom-6 -left-4 sm:left-6 bg-white rounded-2xl shadow-xl p-5 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-xl">
              <i className="fa-solid fa-circle-check"></i>
            </div>
            <div>
              <p className="font-bold text-slate-900">Association déclarée</p>
              <p className="text-xs text-slate-500">Immatriculée & conforme</p>
            </div>
          </div>

          <div className="absolute -top-5 -right-3 sm:right-6 bg-white/95 backdrop-blur rounded-2xl shadow-xl p-5">
            <div className="grid grid-cols-3 gap-5 text-center">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-xl font-extrabold text-primary">{s.value}</p>
                  <p className="text-[11px] text-slate-500 leading-tight">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
