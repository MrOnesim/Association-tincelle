import { useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeading from './SectionHeading'
import Reveal from './Reveal'
import Spark from './Spark'

const faqs = [
  {
    q: "Qui peut bénéficier de l'aide ?",
    a: "Les particuliers, étudiants, entrepreneurs et porteurs de projets peuvent déposer une demande selon les critères définis par l'association.",
  },
  {
    q: 'Quels documents sont nécessaires ?',
    a: "Une pièce d'identité, des justificatifs de revenus et tout document relatif au projet présenté.",
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
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="relative overflow-hidden bg-ivory py-24 sm:py-28">
      <div className="pointer-events-none absolute -top-24 -right-24 h-80 w-80 rounded-full bg-wine-200/40 blur-3xl" />
      <div className="container-x relative max-w-3xl">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Questions <span className="text-wine-600">fréquentes</span>
            </>
          }
          description="Retrouvez les réponses aux questions les plus posées par nos bénéficiaires."
        />

        <div className="mt-12 space-y-4">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal key={i} delay={i * 80} variant="up">
                <div
                  className={`overflow-hidden rounded-2xl border bg-white transition-all duration-500 ${
                    isOpen ? 'border-wine-600/30 shadow-lift' : 'border-ink/8 shadow-soft hover:border-wine-600/20'
                  }`}
                >
                  <button
                    className="flex w-full items-center justify-between gap-4 p-6 text-left"
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center gap-3.5 font-display text-lg font-semibold text-ink">
                      <Spark
                        className={`h-4 w-4 shrink-0 transition-all duration-500 ${
                          isOpen ? 'rotate-90 text-wine-600' : 'text-gold-500'
                        }`}
                      />
                      {item.q}
                    </span>
                    <span
                      className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-sm transition-all duration-500 ${
                        isOpen ? 'rotate-45 bg-brand-grad text-white' : 'bg-wine-100 text-wine-600'
                      }`}
                    >
                      <i className="fa-solid fa-plus" />
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-500 ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 pl-[3.75rem] leading-relaxed text-muted">{item.a}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={200} variant="up" className="mt-10 text-center">
          <p className="text-muted">
            Une autre question ?{' '}
            <Link to="/demande" className="font-bold text-wine-600 underline-offset-4 transition hover:underline">
              Contactez-nous
            </Link>{' '}
            ou consultez l'assistant en bas de page.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
