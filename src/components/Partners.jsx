import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const partners = [
  { icon: 'fa-solid fa-hand-holding-heart', title: 'ONG', text: 'Programmes humanitaires, éducation, santé et inclusion sociale.' },
  { icon: 'fa-solid fa-building', title: 'Entreprises', text: 'RSE, entrepreneuriat, innovation sociale et insertion professionnelle.' },
  { icon: 'fa-solid fa-landmark', title: 'Fondations', text: 'Financement de projets à impact durable et mesurable.' },
]

export default function Partners() {
  return (
    <section id="partenariats" className="py-24 bg-slate-50">
      <div className="container-x">
        <SectionHeading
          eyebrow="Partenariats"
          title="Ils construisent avec nous"
          description="Nous collaborons avec des acteurs engagés pour amplifier notre impact."
        />

        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {partners.map((p, i) => (
            <Reveal key={p.title} delay={i * 100}>
              <div className="card p-8 h-full">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center text-2xl mb-5">
                  <i className={p.icon}></i>
                </div>
                <h3 className="font-bold text-xl text-slate-900">{p.title}</h3>
                <p className="mt-3 text-slate-600 leading-relaxed">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
