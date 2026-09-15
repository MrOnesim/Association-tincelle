import { Link } from 'react-router-dom'
import { contact, addressLine } from '../data/contact'
import Spark from './Spark'
import Logo from './Logo'

const links = [
  { label: 'Accueil', to: '/' },
  { label: 'Nos programmes', to: '/programmes' },
  { label: 'À propos', to: '/apropos' },
  { label: 'Témoignages', to: '/temoignages' },
  { label: 'Partenaires', to: '/partenaires' },
  { label: 'FAQ', to: '/faq' },
]

const legal = [
  { label: 'Conditions d\'éligibilité', to: '/conditions' },
  { label: 'Déposer une demande', to: '/demande' },
  { label: 'Mentions légales', to: '/mentions-legales' },
  { label: 'Politique de confidentialité', to: '/confidentialite' },
]

export default function Footer() {
  return (
    <footer className="grain relative overflow-hidden bg-ink-grad text-porcelain">
      <div className="pointer-events-none absolute -top-32 left-1/4 h-96 w-96 rounded-full bg-wine-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-1/5 h-80 w-80 rounded-full bg-gold-500/10 blur-3xl" />
      <Spark className="pointer-events-none absolute right-[10%] top-12 h-6 w-6 text-gold-300/40 animate-twinkle" />

      {/* Liseré supérieur */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/60 to-transparent" />

      <div className="container-x relative py-16 sm:py-20">
        {/* Bandeau confiance */}
        <div className="mb-14 flex flex-col items-center gap-4 border-b border-white/10 pb-12 text-center">
          <Spark className="h-6 w-6 text-gold-300" />
          <h4 className="font-display text-2xl font-semibold sm:text-3xl">
            Vos données restent <span className="text-gold-300">confidentielles</span>
          </h4>
          <p className="max-w-3xl leading-relaxed text-porcelain/60">
            Les informations transmises via les formulaires servent uniquement à l'étude des demandes,
            à la gestion des bénéficiaires et au suivi administratif de l'Association Étincelle.
            Aucune donnée personnelle n'est vendue ni transmise à des tiers sans votre autorisation.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <Logo onDark className="h-11 w-auto" />
              <span className="font-display text-2xl font-semibold">
                Association <span className="text-gold-300">Étincelle</span>
              </span>
            </div>
            <p className="mt-5 max-w-md leading-relaxed text-porcelain/60">
              Votre liberté financière, notre objectif. Une organisation à but non lucratif engagée
              pour l'autonomie, l'inclusion et la dignité de chacune et chacun.
            </p>
            <a
              href={`mailto:${contact.email}`}
              className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-porcelain/80 transition hover:border-gold-400/50 hover:text-gold-300"
            >
              <i className="fa-solid fa-envelope" />
              {contact.email}
            </a>
            <a
              href={contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-start gap-2.5 text-sm text-porcelain/60 transition hover:text-gold-300"
            >
              <i className="fa-solid fa-location-dot mt-1" />
              {addressLine()}
            </a>
          </div>

          <div>
            <h5 className="eyebrow-light mb-5">Navigation</h5>
            <ul className="space-y-3">
              {links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="group inline-flex items-center gap-2 text-porcelain/70 transition hover:text-gold-300">
                    <Spark className="h-2 w-2 text-gold-400/0 transition group-hover:text-gold-400" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h5 className="eyebrow-light mb-5">Informations</h5>
            <ul className="space-y-3">
              {legal.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="group inline-flex items-center gap-2 text-porcelain/70 transition hover:text-gold-300">
                    <Spark className="h-2 w-2 text-gold-400/0 transition group-hover:text-gold-400" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex gap-3">
              {contact.socials.map((s) => (
                <a
                  key={s.icon}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.name}
                  className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-porcelain/70 transition hover:-translate-y-0.5 hover:border-gold-400/60 hover:text-gold-300"
                >
                  <i className={s.icon} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-sm text-porcelain/50 sm:flex-row">
          <p>© 2026 Association Étincelle — Tous droits réservés.</p>
          <p className="flex items-center gap-2">
            <Spark className="h-3 w-3 text-gold-400" />
            Transparence · Confiance · Solidarité
          </p>
        </div>
      </div>
    </footer>
  )
}
