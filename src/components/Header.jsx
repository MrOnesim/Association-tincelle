import { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { contact } from '../data/contact'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Accueil', to: '/' },
    { label: 'Programmes', to: '/programmes' },
    { label: 'À propos', to: '/apropos' },
    { label: 'Témoignages', to: '/temoignages' },
    { label: 'Partenaires', to: '/partenaires' },
    { label: 'FAQ', to: '/faq' },
  ]

  const navLinkClass = ({ isActive }) =>
    `transition hover:text-primary ${isActive ? 'text-primary' : 'text-slate-700'}`

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Barre de contact */}
      <div className="hidden md:block bg-primary text-white text-sm">
        <div className="container-x flex items-center justify-between h-9">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-2">
              <i className="fa-solid fa-envelope text-xs"></i>
              {contact.email}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {contact.socials.map((s) => (
              <a
                key={s.icon}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent transition"
                aria-label={s.name}
              >
                <i className={s.icon}></i>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div
        className={`transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md' : 'bg-white/85 backdrop-blur-md'
        }`}
      >
        <div className="container-x flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/assets/ChatGPT_Image_22_juin_2026__10_59_05-removebg-preview.png"
              alt="Association Étincelle"
              className="h-11 w-11 object-contain"
            />
            <div>
              <h1 className="font-bold text-lg leading-tight text-slate-900">Association Étincelle</h1>
              <p className="text-[11px] text-slate-500 leading-tight">
                Votre liberté financière, notre mission
              </p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} className={navLinkClass} end={l.to === '/'}>
                {l.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link to="/demande" className="btn-primary hidden sm:inline-flex">
              Déposer une demande
            </Link>
            <button
              className="lg:hidden text-slate-700 p-2"
              onClick={() => setOpen(!open)}
              aria-label="Menu"
            >
              <i className={`fa-solid ${open ? 'fa-xmark' : 'fa-bars'} text-xl`}></i>
            </button>
          </div>
        </div>

        {open && (
          <nav className="lg:hidden border-t border-slate-100 bg-white px-6 py-4 flex flex-col gap-3 text-sm font-medium">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.to === '/'}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `hover:text-primary ${isActive ? 'text-primary' : 'text-slate-700'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
            <Link to="/demande" onClick={() => setOpen(false)} className="btn-primary mt-2">
              Déposer une demande
            </Link>
          </nav>
        )}
      </div>
    </header>
  )
}
