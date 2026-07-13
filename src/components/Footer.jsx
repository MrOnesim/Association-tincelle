import { Link } from 'react-router-dom'
import { contact } from '../data/contact'

const links = [
  { label: 'Accueil', to: '/' },
  { label: 'À propos', to: '/apropos' },
  { label: 'Programmes', to: '/programmes' },
  { label: 'Témoignages', to: '/temoignages' },
  { label: 'Partenaires', to: '/partenaires' },
  { label: 'FAQ', to: '/faq' },
  { label: 'Contact', to: '/demande' },
]

export default function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container-x py-16">
        <div className="text-center border-b border-white/20 pb-8 mb-10">
          <h4 className="font-bold text-2xl mb-4">Mentions légales & Confidentialité</h4>
          <p className="text-white/90 max-w-5xl mx-auto leading-relaxed">
            Les informations transmises via les formulaires sont utilisées uniquement pour l'étude
            des demandes, la gestion des bénéficiaires, des partenaires et le suivi administratif de
            l'Association Étincelle. Aucune donnée personnelle n'est vendue ou transmise à des tiers
            sans autorisation préalable.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <img
                src="/assets/ChatGPT_Image_22_juin_2026__10_59_05-removebg-preview.png"
                alt="Association Étincelle"
                className="h-12 w-12 object-contain bg-white/10 rounded-xl p-1"
              />
              <h3 className="text-2xl font-bold">Association Étincelle</h3>
            </div>
            <p className="text-white/90 mt-4 max-w-md leading-relaxed">
              Votre liberté financière, notre mission. Une organisation à but non lucratif engagée
              pour l'autonomie et l'inclusion.
            </p>
            <p className="mt-4 flex items-center gap-2">
              <i className="fa-solid fa-envelope"></i>
              {contact.email}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Liens utiles</h4>
            <ul className="space-y-2">
              {links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-white/90 hover:text-accent transition">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-lg mb-4">Suivez-nous</h4>
            <div className="flex flex-wrap gap-4 text-2xl">
              {contact.socials.map((s) => (
                <a
                  key={s.icon}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-primary transition"
                >
                  <i className={s.icon}></i>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12 pt-8 border-t border-white/20 text-white/80 text-sm">
          <p>© 2026 Association Étincelle — Tous droits réservés.</p>
          <div className="mt-2 flex justify-center gap-6">
            <a href="#" className="hover:text-accent transition">Mentions légales</a>
            <a href="#" className="hover:text-accent transition">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
