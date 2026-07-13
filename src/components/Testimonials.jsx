import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const testimonials = [
  {
    text: "Grâce à l'Association Étincelle, j'ai pu lancer mon activité et développer mon entreprise dans de bonnes conditions.",
    name: 'Jean Dupont',
    role: 'Entrepreneur',
    avatar: 'https://i.pravatar.cc/100?img=12',
  },
  {
    text: 'Une équipe à l\'écoute et un accompagnement très professionnel tout au long de mon projet.',
    name: 'Sophie Martin',
    role: 'Étudiante',
    avatar: 'https://i.pravatar.cc/100?img=32',
  },
  {
    text: 'Le processus a été simple et transparent. Je recommande vivement cette association.',
    name: 'Marc Bernard',
    role: 'Porteur de projet',
    avatar: 'https://i.pravatar.cc/100?img=45',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="container-x">
        <SectionHeading
          eyebrow="Témoignages"
          title="Ce que disent nos bénéficiaires"
          description="Découvrez les expériences de personnes accompagnées par l'Association Étincelle."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 100}>
              <div className="card p-8 flex flex-col h-full">
              <i className="fa-solid fa-quote-left text-primary/30 text-3xl"></i>
              <p className="text-slate-600 mt-4 flex-1 leading-relaxed">"{t.text}"</p>
              <div className="flex items-center gap-4 mt-6 pt-6 border-t border-slate-100">
                <img src={t.avatar} className="w-12 h-12 rounded-full object-cover" alt={t.name} />
                <div>
                  <h4 className="font-bold text-slate-900">{t.name}</h4>
                  <span className="text-sm text-slate-500">{t.role}</span>
                </div>
              </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
