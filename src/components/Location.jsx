import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import Spark from './Spark'
import { contact, addressLine } from '../data/contact'

const rows = [
  { icon: 'fa-solid fa-location-dot', label: 'Adresse', value: addressLine() },
  { icon: 'fa-solid fa-phone', label: 'Téléphone', value: contact.phone, href: contact.phoneHref },
  { icon: 'fa-solid fa-envelope', label: 'E-mail', value: contact.email, href: `mailto:${contact.email}` },
  { icon: 'fa-solid fa-clock', label: 'Horaires', value: contact.hours },
  { icon: 'fa-solid fa-map-pin', label: 'Plus code', value: contact.plusCode },
]

/** Section « Nous trouver » : coordonnées + carte Google Maps intégrée. */
export default function Location() {
  return (
    <section id="localisation" className="relative overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute -top-24 -left-24 h-80 w-80 rounded-full bg-wine-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gold-200/40 blur-3xl" />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-2 lg:gap-16">
        {/* Coordonnées */}
        <div>
          <Reveal variant="left">
            <SectionHeading
              center={false}
              eyebrow="Nous trouver"
              title={
                <>
                  Nos bureaux vous <span className="text-wine-600">accueillent</span>
                </>
              }
              description="Rencontrons-nous : notre équipe vous reçoit sur rendez-vous dans nos locaux de La Celle-Saint-Cloud."
            />
          </Reveal>

          <div className="mt-9 space-y-4">
            {rows.map((r, i) => (
              <Reveal key={r.label} delay={i * 80} variant="left">
                <div className="group flex items-start gap-4 rounded-2xl border border-ink/8 bg-white p-5 shadow-soft transition-all duration-500 hover:border-wine-600/25 hover:shadow-lift">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-brand-grad text-white shadow-soft transition-transform duration-500 group-hover:rotate-6">
                    <i className={r.icon} />
                  </span>
                  <span>
                    <span className="block text-xs font-bold uppercase tracking-widest2 text-muted">
                      {r.label}
                    </span>
                    {r.href ? (
                      <a
                        href={r.href}
                        className="mt-1 block font-display text-lg font-semibold text-ink transition hover:text-wine-600"
                      >
                        {r.value}
                      </a>
                    ) : (
                      <span className="mt-1 block font-display text-lg font-semibold text-ink">
                        {r.value}
                      </span>
                    )}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={220} variant="up" className="mt-8 flex flex-wrap gap-4">
            <a href={contact.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Ouvrir dans Google Maps
              <i className="fa-solid fa-arrow-up-right-from-square" />
            </a>
            <a href={contact.mapsDirections} target="_blank" rel="noopener noreferrer" className="btn-outline">
              Itinéraire
              <i className="fa-solid fa-diamond-turn-right" />
            </a>
          </Reveal>
        </div>

        {/* Carte intégrée */}
        <Reveal variant="right" className="relative">
          <div className="pointer-events-none absolute -top-5 -right-5 h-full w-full rounded-frame border-2 border-gold-400/40" />
          <div className="frame relative h-[420px] shadow-lift sm:h-[480px]">
            <iframe
              title="Carte Google Maps — Association Étincelle, 2D Av. des Étangs, 78170 La Celle-Saint-Cloud"
              src={contact.mapsEmbed}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          </div>
          <div className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl border border-ink/5 bg-white/95 p-4 shadow-lift backdrop-blur sm:left-6">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-brand-grad text-white">
              <i className="fa-solid fa-location-dot" />
            </span>
            <span>
              <span className="block text-sm font-bold text-ink">{contact.address.name}</span>
              <span className="block text-xs text-muted">{contact.plusCode}</span>
            </span>
            <Spark className="ml-1 h-3.5 w-3.5 text-gold-500 animate-twinkle" />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
