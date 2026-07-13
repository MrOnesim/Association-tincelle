import { useState } from 'react'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'

const faqs = [
  {
    q: 'Qui peut bénéficier de l\'aide ?',
    a: "Les particuliers, étudiants, entrepreneurs et porteurs de projets peuvent déposer une demande selon les critères définis par l'association.",
  },
  {
    q: 'Quels documents sont nécessaires ?',
    a: 'Une pièce d\'identité, des justificatifs de revenus et tout document relatif au projet présenté.',
  },
  {
    q: 'Quel est le délai de traitement ?',
    a: 'Les demandes sont généralement étudiées sous quelques jours ouvrables, avec un retour sous 48 heures.',
  },
  {
    q: 'Comment suivre ma demande ?',
    a: "Vous recevrez des notifications par e-mail ou par téléphone concernant l'avancement de votre dossier.",
  },
]

export default function Faq() {
  const [open, setOpen] = useState(null)

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container-x max-w-4xl">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions fréquentes"
          description="Retrouvez les réponses aux questions les plus posées par nos bénéficiaires."
        />

        <div className="mt-12 space-y-4">
          {faqs.map((item, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
              <button
                className="w-full flex justify-between items-center p-6 font-semibold text-left text-slate-900 hover:text-primary transition"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {item.q}
                <i
                  className={`fa-solid ${open === i ? 'fa-minus' : 'fa-plus'} text-primary transition-transform`}
                ></i>
              </button>
              <div
                className={`grid transition-all duration-300 ${
                  open === i ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="p-6 pt-0 text-slate-600 leading-relaxed">{item.a}</p>
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
