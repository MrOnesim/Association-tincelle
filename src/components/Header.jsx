import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { contact } from '../data/contact'
import Logo from './Logo'

const links = [
  { label: 'Accueil', to: '/' },
  { label: 'Programmes', to: '/programmes' },
  { label: 'À propos', to: '/apropos' },
  { label: 'Témoignages', to: '/temoignages' },
  { label: 'Partenaires', to: '/partenaires' },
  { label: 'FAQ', to: '/faq' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Bandeau contact — se replie au scroll */}
      <div
        className={`hidden overflow-hidden bg-ink text-porcelain/80 transition-all duration-500 md:block ${
          scrolled ? 'max-h-0' : 'max-h-10'
        }`}
      >
        <div className="container-x flex h-9 items-center justify-between text-xs">
          <div className="flex items-center gap-6">
            <a href={`mailto:${contact.email}`} className="flex items-center gap-2 transition hover:text-gold-300">
              <i className="fa-solid fa-envelope" />
              {contact.email}
            </a>
            <a
              href={contact.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 transition hover:text-gold-300 lg:flex"
            >
              <i className="fa-solid fa-location-dot" />
              {contact.address.city}
            </a>
          </div>
          <div className="flex items-center gap-4">
            {contact.socials.map((s) => (
              <a key={s.icon} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="transition hover:text-gold-300">
                <i className={s.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Barre de navigation */}
      <div
        className={`transition-all duration-500 ${
          scrolled
            ? 'border-b border-ink/5 bg-porcelain/90 shadow-soft backdrop-blur-xl'
            : 'border-b border-transparent bg-porcelain/60 backdrop-blur-md'
        }`}
      >
        <div className="container-x flex h-20 items-center justify-between">
          <Link to="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
            <Logo className="h-12 w-auto transition-transform duration-500 group-hover:scale-105" />
            <span className="leading-tight">
              <span className="block font-display text-lg font-semibold tracking-tight text-ink">
                Association <span className="text-wine-600">Étincelle</span>
              </span>
              <span className="block text-[11px] font-medium uppercase tracking-widest2 text-muted">
                Votre liberté financière
              </span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-semibold lg:flex">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className="group relative py-1 text-ink/80 transition hover:text-wine-600">
                {({ isActive }) => (
                  <>
                    {l.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-0.5 rounded-full bg-brand-grad transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/demande" className="btn-primary hidden !px-6 !py-3 sm:inline-flex">
              Déposer une demande
              <i className="fa-solid fa-arrow-right transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <button
              className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-white/70 text-ink transition hover:border-wine-600/40 hover:text-wine-600 lg:hidden"
              onClick={() => setOpen(!open)}
              aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
              aria-expanded={open}
            >
              <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'} text-lg`} />
            </button>
          </div>
        </div>
      </div>

      {/* Menu mobile plein écran */}
      <div
        className={`grain fixed inset-0 top-0 z-[-1] flex flex-col bg-ink-grad pt-28 transition-all duration-500 lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
      >
        <div className="container-x mb-6 flex items-center gap-3.5">
          <Logo onDark className="h-10 w-auto" />
          <span className="font-display text-xl font-semibold text-porcelain">
            Association <span className="text-gold-300">Étincelle</span>
          </span>
        </div>
        <nav className="container-x flex flex-col gap-1">
          {links.map((l, i) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setOpen(false)}
              style={{ transitionDelay: `${i * 40}ms` }}
              className={({ isActive }) =>
                `flex items-center justify-between border-b border-white/8 py-4 font-display text-2xl transition ${
                  isActive ? 'text-gold-300' : 'text-porcelain hover:text-gold-300'
                }`
              }
            >
              {l.label}
              <i className="fa-solid fa-arrow-right text-sm opacity-50" />
            </NavLink>
          ))}
        </nav>
        <div className="container-x mt-8 flex flex-col gap-5">
          <Link to="/demande" onClick={() => setOpen(false)} className="btn-primary w-full">
            Déposer une demande
            <i className="fa-solid fa-arrow-right" />
          </Link>
          <div className="flex items-center justify-center gap-5 pb-10 text-xl text-porcelain/70">
            {contact.socials.map((s) => (
              <a key={s.icon} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.name} className="transition hover:text-gold-300">
                <i className={s.icon} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}
