import { useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeading from './SectionHeading'
import Spark from './Spark'
import { contact } from '../data/contact'

const field =
  'w-full rounded-xl border border-ink/12 bg-white px-4 py-3.5 text-ink shadow-none transition placeholder:text-muted/50 focus:border-wine-600 focus:outline-none focus:ring-2 focus:ring-wine-600/20'
const labelClass = 'mb-2 block text-sm font-semibold text-ink'
const fileField =
  'block w-full cursor-pointer text-sm text-muted file:mr-4 file:cursor-pointer file:rounded-full file:border-0 file:bg-brand-grad file:px-5 file:py-2.5 file:text-sm file:font-bold file:text-white transition hover:file:opacity-90'

const REQUIRED = [
  'nom', 'adresse', 'cp', 'ville', 'pays', 'tel', 'email',
  'salarie', 'revenus', 'charge', 'dejaAide', 'montant', 'raisons',
  'banque', 'compte', 'titulaire',
]

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const telRe = /^[+]?[\d\s().-]{8,}$/

function validateField(name, value) {
  if (name === 'email') {
    if (!value) return 'Ce champ est requis.'
    return emailRe.test(value) ? '' : 'Adresse e-mail invalide.'
  }
  if (name === 'tel') {
    if (!value) return 'Ce champ est requis.'
    return telRe.test(value) ? '' : 'Numéro de téléphone invalide.'
  }
  if (name === 'montant') {
    if (!value) return 'Ce champ est requis.'
    return Number(value) > 0 ? '' : 'Le montant doit être supérieur à 0.'
  }
  return ''
}

function Fieldset({ step, title, children }) {
  return (
    <fieldset className="rounded-2xl border border-ink/8 bg-white p-6 shadow-soft sm:p-7">
      <legend className="sr-only">{title}</legend>
      <div className="mb-6 flex items-center gap-3">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-brand-grad font-display text-sm font-semibold text-white shadow-soft">
          {step}
        </span>
        <h3 className="font-display text-xl font-semibold text-ink">{title}</h3>
        <Spark className="ml-auto h-4 w-4 text-gold-500" />
      </div>
      <div className="space-y-5">{children}</div>
    </fieldset>
  )
}

function ErrorText({ name, errors }) {
  return errors[name] ? (
    <p className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-red-600">
      <i className="fa-solid fa-circle-exclamation" />
      {errors[name]}
    </p>
  ) : null
}

export default function DemandForm() {
  const [form, setForm] = useState({
    nom: '', adresse: '', cp: '', ville: '', pays: '', tel: '', email: '',
    salarie: '', revenus: '', charge: '', dejaAide: '',
    montant: '', raisons: '',
    banque: '', compte: '', titulaire: '',
  })
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [consent, setConsent] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const update = (e) => {
    const { name, value } = e.target
    setForm({ ...form, [name]: value })
    if (touched[name]) {
      setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
    }
  }

  const blur = (e) => {
    const { name, value } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }))
  }

  const progress = Math.round(
    ((REQUIRED.filter((k) => form[k]).length + (consent ? 1 : 0)) / (REQUIRED.length + 1)) * 100
  )

  const handleSubmit = (e) => {
    e.preventDefault()
    const nextErrors = {}
    REQUIRED.forEach((k) => {
      const err = validateField(k, form[k])
      if (err) nextErrors[k] = err
    })
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0 || !consent) {
      setTouched(Object.fromEntries(REQUIRED.map((k) => [k, true])))
      return
    }

    const msg =
      `FORMULAIRE DE DEMANDE D'AIDE FINANCIERE - ASSOCIATION ETINCELLE\n` +
      `— INFORMATIONS PERSONNELLES —\n` +
      `Nom : ${form.nom}\nAdresse : ${form.adresse}\nCode postal : ${form.cp}\n` +
      `Ville : ${form.ville}\nPays : ${form.pays}\nTéléphone : ${form.tel}\nEmail : ${form.email}\n\n` +
      `— SITUATION FINANCIERE —\nSalarié(e) : ${form.salarie}\nRevenus mensuels : ${form.revenus}\n` +
      `Personnes à charge : ${form.charge}\nDéjà aidé : ${form.dejaAide}\n\n` +
      `— MOTIVATION —\nMontant demandé : ${form.montant}\nRaisons : ${form.raisons}\n\n` +
      `— RECEPTION DES FONDS —\nBanque : ${form.banque}\nCompte : ${form.compte}\nTitulaire : ${form.titulaire}`

    if (contact.formEndpoint) {
      fetch(contact.formEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      }).catch(() => {})
    }

    window.open(`${contact.whatsapp}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer')
    setSubmitted(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <section id="demande" className="grain relative overflow-hidden py-24 sm:py-28">
      <div className="pointer-events-none absolute -top-24 -right-24 h-96 w-96 rounded-full bg-wine-200/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-gold-200/40 blur-3xl" />

      <div className="container-x relative">
        <SectionHeading
          eyebrow="Association Étincelle"
          title={
            <>
              Formulaire de <span className="text-wine-600">demande d'aide</span>
            </>
          }
          description="Remplissez ce formulaire avec exactitude. Notre équipe étudie chaque dossier avec la plus grande confidentialité."
        />

        <div className="mx-auto mt-12 max-w-3xl">
          {submitted ? (
            <div className="rounded-frame border border-ink/8 bg-white p-10 text-center shadow-lift">
              <span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-emerald-500 to-emerald-400 text-3xl text-white shadow-soft">
                <i className="fa-solid fa-circle-check" />
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold text-ink">Demande envoyée</h3>
              <p className="mt-3 leading-relaxed text-muted">
                Merci {form.nom || ''}, votre demande a été transmise sur WhatsApp. Complétez l'envoi
                depuis votre application pour que notre équipe la traite dans les meilleurs délais.
              </p>
              <a
                href={`${contact.whatsapp}?text=${encodeURIComponent(
                  "Bonjour, j'ai rempli le formulaire de demande d'aide financière de l'Association Étincelle."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-7 inline-flex"
              >
                Ouvrir WhatsApp
                <i className="fa-brands fa-whatsapp" />
              </a>
              <button
                onClick={() => setSubmitted(false)}
                className="mx-auto mt-4 block text-sm font-semibold text-muted transition hover:text-wine-600"
              >
                Modifier ma demande
              </button>
            </div>
          ) : (
            <form className="space-y-7" onSubmit={handleSubmit} noValidate>
              {/* Avertissement sécurité */}
              <div className="flex items-start gap-3.5 rounded-2xl border border-gold-400/40 bg-gold-100/60 p-5 text-gold-700">
                <i className="fa-solid fa-triangle-exclamation mt-0.5" />
                <p className="text-sm leading-relaxed">
                  <strong className="font-bold">Sécurité :</strong> ce formulaire transmet vos documents
                  (pièce d'identité, RIB) via WhatsApp. Pour des données sensibles, privilégiez un envoi
                  chiffré. En soumettant, vous acceptez la transmission vers notre canal de suivi.
                </p>
              </div>

              {/* Barre de progression */}
              <div className="rounded-2xl border border-ink/8 bg-white p-5 shadow-soft">
                <div className="mb-2 flex items-center justify-between text-xs font-bold uppercase tracking-widest2 text-muted">
                  <span>Progression</span>
                  <span className="text-wine-600">{progress}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-ivory">
                  <div className="h-full rounded-full bg-brand-grad transition-all duration-500" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <Fieldset step="1" title="Informations personnelles">
                <div>
                  <label className={labelClass} htmlFor="nom">1. Nom complet</label>
                  <input id="nom" name="nom" required className={field} onChange={update} onBlur={blur} />
                  <ErrorText name="nom" errors={errors} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="adresse">2. Adresse</label>
                  <input id="adresse" name="adresse" required className={field} onChange={update} onBlur={blur} />
                  <ErrorText name="adresse" errors={errors} />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className={labelClass} htmlFor="cp">3. Code postal</label>
                    <input id="cp" name="cp" required className={field} onChange={update} onBlur={blur} />
                    <ErrorText name="cp" errors={errors} />
                  </div>
                  <div>
                    <label className={labelClass} htmlFor="ville">4. Ville</label>
                    <input id="ville" name="ville" required className={field} onChange={update} onBlur={blur} />
                    <ErrorText name="ville" errors={errors} />
                  </div>
                </div>
                <div>
                  <label className={labelClass} htmlFor="pays">Pays</label>
                  <select id="pays" name="pays" required className={field} onChange={update} onBlur={blur}>
                    <option value="">Choisir votre pays</option>
                    <option>Allemagne</option><option>Autriche</option><option>Belgique</option>
                    <option>Bulgarie</option><option>Chypre</option><option>Croatie</option>
                    <option>Espagne</option><option>Estonie</option><option>Finlande</option>
                    <option>France</option><option>Grèce</option><option>Irlande</option>
                    <option>Italie</option><option>Lettonie</option><option>Lituanie</option>
                    <option>Luxembourg</option><option>Malte</option><option>Pays-Bas</option>
                    <option>Portugal</option><option>Slovaquie</option><option>Slovénie</option>
                    <option>Andorre</option><option>Monaco</option><option>Saint-Marin</option>
                    <option>Vatican</option><option>Autre</option>
                  </select>
                  <ErrorText name="pays" errors={errors} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="tel">
                    5. Numéro de téléphone <span className="font-normal text-muted">(ex : +33 1 23 45 67 89)</span>
                  </label>
                  <input id="tel" type="tel" name="tel" required placeholder="+33 1 23 45 67 89" className={field} onChange={update} onBlur={blur} />
                  <ErrorText name="tel" errors={errors} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="email">6. Adresse e-mail</label>
                  <input id="email" type="email" name="email" required className={field} onChange={update} onBlur={blur} />
                  <ErrorText name="email" errors={errors} />
                </div>
              </Fieldset>

              <Fieldset step="2" title="Situation financière">
                <div>
                  <span className={labelClass}>7. Êtes-vous actuellement salarié(e) ?</span>
                  <div className="flex gap-4">
                    {['Oui', 'Non'].map((o) => (
                      <label key={o} className="flex cursor-pointer items-center gap-2.5 rounded-full border border-ink/12 bg-white px-5 py-2.5 font-semibold text-ink transition hover:border-wine-600/40 has-[:checked]:border-wine-600 has-[:checked]:bg-wine-50 has-[:checked]:text-wine-700">
                        <input type="radio" name="salarie" value={o} required onChange={update} className="h-4 w-4 accent-wine-600" />
                        {o}
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className={labelClass} htmlFor="revenus">8. Revenus mensuels</label>
                  <input id="revenus" name="revenus" required className={field} onChange={update} onBlur={blur} />
                  <ErrorText name="revenus" errors={errors} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="charge">9. Nombre de personnes à charge</label>
                  <input id="charge" type="number" min="0" name="charge" required className={field} onChange={update} onBlur={blur} />
                  <ErrorText name="charge" errors={errors} />
                </div>
                <div>
                  <span className={labelClass}>10. Avez-vous déjà bénéficié d'une aide financière de l'Association Étincelle ?</span>
                  <div className="flex gap-4">
                    {['Oui', 'Non'].map((o) => (
                      <label key={o} className="flex cursor-pointer items-center gap-2.5 rounded-full border border-ink/12 bg-white px-5 py-2.5 font-semibold text-ink transition hover:border-wine-600/40 has-[:checked]:border-wine-600 has-[:checked]:bg-wine-50 has-[:checked]:text-wine-700">
                        <input type="radio" name="dejaAide" value={o} required onChange={update} className="h-4 w-4 accent-wine-600" />
                        {o}
                      </label>
                    ))}
                  </div>
                </div>
              </Fieldset>

              <Fieldset step="3" title="Motivation de la demande">
                <div>
                  <label className={labelClass} htmlFor="montant">11. Montant de l'aide financière demandée (€)</label>
                  <input id="montant" type="number" min="0" name="montant" required className={field} onChange={update} onBlur={blur} />
                  <ErrorText name="montant" errors={errors} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="raisons">
                    12. Décrivez en quelques lignes les raisons pour lesquelles vous sollicitez cette aide
                  </label>
                  <textarea id="raisons" rows="5" name="raisons" required className={field} onChange={update} onBlur={blur}></textarea>
                  <ErrorText name="raisons" errors={errors} />
                </div>
              </Fieldset>

              <Fieldset step="4" title="Moyen de réception des fonds">
                <p className="-mt-2 text-sm text-muted">
                  Veuillez choisir votre mode de réception et fournir les informations nécessaires.
                </p>
                <div>
                  <label className={labelClass} htmlFor="banque">Nom de la banque</label>
                  <input id="banque" name="banque" required className={field} onChange={update} onBlur={blur} />
                  <ErrorText name="banque" errors={errors} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="compte">Numéro de compte bancaire</label>
                  <input id="compte" name="compte" required className={field} onChange={update} onBlur={blur} />
                  <ErrorText name="compte" errors={errors} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="titulaire">Nom du titulaire du compte</label>
                  <input id="titulaire" name="titulaire" required className={field} onChange={update} onBlur={blur} />
                  <ErrorText name="titulaire" errors={errors} />
                </div>
              </Fieldset>

              <Fieldset step="5" title="Documents à joindre">
                <div>
                  <label className={labelClass} htmlFor="doc-id">
                    Une pièce d'identité en cours de validité <span className="font-normal text-muted">(Recto / Verso)</span>
                  </label>
                  <input id="doc-id" type="file" required className={fileField} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="doc-domicile">Un justificatif de domicile récent</label>
                  <input id="doc-domicile" type="file" required className={fileField} />
                </div>
                <div>
                  <label className={labelClass} htmlFor="doc-finances">
                    Tout document justifiant de votre situation financière actuelle{' '}
                    <span className="font-normal text-muted">(ex. : fiches de paie, avis d'imposition)</span>
                  </label>
                  <input id="doc-finances" type="file" required className={fileField} />
                </div>
              </Fieldset>

              {/* Consentement RGPD */}
              <div className="rounded-2xl border border-wine-600/20 bg-wine-50 p-6">
                <label className="flex cursor-pointer items-start gap-3.5">
                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-wine-600"
                  />
                  <span className="text-sm leading-relaxed text-ink/80">
                    J'accepte le traitement de mes données personnelles conformément à la{' '}
                    <Link to="/confidentialite" className="font-bold text-wine-600 underline underline-offset-2">
                      politique de confidentialité
                    </Link>{' '}
                    de l'Association Étincelle.
                  </span>
                </label>
              </div>

              {/* Notice direction */}
              <div className="grain relative overflow-hidden rounded-2xl bg-ink-grad p-6 text-porcelain">
                <Spark className="pointer-events-none absolute right-5 top-5 h-4 w-4 text-gold-300/60 animate-twinkle" />
                <p className="font-display text-lg font-semibold text-gold-300">
                  DIRECTION DE L'ASSOCIATION ÉTINCELLE
                </p>
                <p className="mt-2 text-sm leading-relaxed text-porcelain/70">
                  NB : Veuillez remplir ce formulaire avec des informations exactes. Des frais uniques
                  sont requis pour l'établissement de votre dossier. Après paiement, votre demande sera
                  traitée rapidement, et vous recevrez votre financement dans les heures suivantes.
                </p>
              </div>

              <button type="submit" className="btn-primary w-full py-4 text-base">
                Envoyer ma demande
                <i className="fa-solid fa-paper-plane transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <p className="flex items-center justify-center gap-2 text-center text-xs font-semibold text-muted">
                <i className="fa-solid fa-lock text-wine-600" />
                Vos informations restent strictement confidentielles.
              </p>
            </form>
          )}
        </div>
      </div>

      {/* Bouton WhatsApp flottant */}
      <a
        href={contact.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Nous contacter sur WhatsApp"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-400 px-5 py-4 font-bold text-white shadow-lift transition hover:-translate-y-0.5 hover:shadow-glow md:bottom-7 md:right-7"
      >
        <i className="fa-brands fa-whatsapp text-xl" />
        <span className="hidden sm:inline">WhatsApp</span>
      </a>
    </section>
  )
}
