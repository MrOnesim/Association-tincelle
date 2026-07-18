import { useState } from 'react'
import { Link } from 'react-router-dom'
import SectionHeading from './SectionHeading'
import { contact } from '../data/contact'

const field =
  'w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white'
const labelClass = 'block text-sm font-medium text-slate-700 mb-2'
const sectionTitle = 'text-lg font-bold text-slate-900 flex items-center gap-2'

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

  const ErrorText = ({ name }) =>
    errors[name] ? <p className="text-red-500 text-xs mt-1">{errors[name]}</p> : null

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
    <section id="demande" className="py-24 bg-slate-50">
      <div className="container-x">
        <SectionHeading
          eyebrow="Association Étincelle"
          title="Formulaire de demande d'aide financière"
          description="Remplissez ce formulaire avec exactitude. Notre équipe étudie chaque dossier avec la plus grande confidentialité."
        />

        <div className="max-w-3xl mx-auto mt-12">
          {submitted ? (
            <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-green-100 text-green-600 flex items-center justify-center text-3xl">
                <i className="fa-solid fa-circle-check"></i>
              </div>
              <h3 className="mt-5 text-2xl font-bold text-slate-900">Demande envoyée</h3>
              <p className="mt-3 text-slate-600">
                Merci {form.nom || ''}, votre demande a été transmise sur WhatsApp.
                Complétez l'envoi depuis votre application pour que notre équipe la traite
                dans les meilleurs délais.
              </p>
              <a
                href={`${contact.whatsapp}?text=${encodeURIComponent(
                  "Bonjour, j'ai rempli le formulaire de demande d'aide financière de l'Association Étincelle."
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary mt-6 inline-flex"
              >
                Ouvrir WhatsApp
                <i className="fa-brands fa-whatsapp"></i>
              </a>
              <button
                onClick={() => setSubmitted(false)}
                className="block mx-auto mt-4 text-sm text-slate-500 hover:text-primary"
              >
                Modifier ma demande
              </button>
            </div>
          ) : (
            <form className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-10" onSubmit={handleSubmit} noValidate>
              {/* Avertissement sécurité */}
              <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-2xl p-4">
                <i className="fa-solid fa-triangle-exclamation mt-0.5"></i>
                <p className="text-sm leading-relaxed">
                  <strong>Sécurité :</strong> ce formulaire transmet vos documents (pièce d'identité,
                  RIB) via WhatsApp. Pour des données sensibles, privilégiez un envoi chiffré. En
                  soumettant, vous acceptez la transmission vers notre canal de suivi.
                </p>
              </div>

              {/* Barre de progression */}
              <div>
                <div className="flex justify-between text-xs text-slate-500 mb-1">
                  <span>Progression du formulaire</span>
                  <span>{progress}%</span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
              </div>

              {/* Informations personnelles */}
              <div>
                <h3 className={sectionTitle}>
                  <span className="text-primary">*</span> Informations personnelles
                </h3>
                <div className="mt-5 space-y-5">
                  <div>
                    <label className={labelClass}>1. Nom complet</label>
                    <input name="nom" required className={field} onChange={update} onBlur={blur} />
                    <ErrorText name="nom" />
                  </div>
                  <div>
                    <label className={labelClass}>2. Adresse</label>
                    <input name="adresse" required className={field} onChange={update} onBlur={blur} />
                    <ErrorText name="adresse" />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>3. Code postal</label>
                      <input name="cp" required className={field} onChange={update} onBlur={blur} />
                      <ErrorText name="cp" />
                    </div>
                    <div>
                      <label className={labelClass}>4. Ville</label>
                      <input name="ville" required className={field} onChange={update} onBlur={blur} />
                      <ErrorText name="ville" />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Pays</label>
                    <select name="pays" required className={field} onChange={update} onBlur={blur}>
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
                    <ErrorText name="pays" />
                  </div>
                  <div>
                    <label className={labelClass}>
                      5. Numéro de téléphone{' '}
                      <span className="text-slate-400 font-normal">(ex : +33 1 23 45 67 89)</span>
                    </label>
                    <input
                      type="tel"
                      name="tel"
                      required
                      placeholder="+33 1 23 45 67 89"
                      className={field}
                      onChange={update}
                      onBlur={blur}
                    />
                    <ErrorText name="tel" />
                  </div>
                  <div>
                    <label className={labelClass}>6. Adresse e-mail</label>
                    <input
                      type="email"
                      name="email"
                      required
                      className={field}
                      onChange={update}
                      onBlur={blur}
                    />
                    <ErrorText name="email" />
                  </div>
                </div>
              </div>

              {/* Situation financière */}
              <div>
                <h3 className={sectionTitle}>
                  <span className="text-primary">*</span> Informations sur la situation financière
                </h3>
                <div className="mt-5 space-y-5">
                  <div>
                    <label className={labelClass}>7. Êtes-vous actuellement salarié(e) ?</label>
                    <div className="flex gap-6">
                      {['Oui', 'Non'].map((o) => (
                        <label key={o} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="salarie" value={o} required onChange={update} className="accent-primary w-4 h-4" />
                          <span>{o}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>8. Revenus mensuels</label>
                    <input name="revenus" required className={field} onChange={update} onBlur={blur} />
                    <ErrorText name="revenus" />
                  </div>
                  <div>
                    <label className={labelClass}>9. Nombre de personnes à charge</label>
                    <input type="number" min="0" name="charge" required className={field} onChange={update} onBlur={blur} />
                    <ErrorText name="charge" />
                  </div>
                  <div>
                    <label className={labelClass}>
                      10. Avez-vous déjà bénéficié d'une aide financière de l'Association Étincelle ?
                    </label>
                    <div className="flex gap-6">
                      {['Oui', 'Non'].map((o) => (
                        <label key={o} className="flex items-center gap-2 cursor-pointer">
                          <input type="radio" name="dejaAide" value={o} required onChange={update} className="accent-primary w-4 h-4" />
                          <span>{o}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Motivation */}
              <div>
                <h3 className={sectionTitle}>
                  <span className="text-primary">*</span> Motivation de la demande
                </h3>
                <div className="mt-5 space-y-5">
                  <div>
                    <label className={labelClass}>11. Montant de l'aide financière demandée</label>
                    <input type="number" min="0" name="montant" required className={field} onChange={update} onBlur={blur} />
                    <ErrorText name="montant" />
                  </div>
                  <div>
                    <label className={labelClass}>
                      12. Décrivez en quelques lignes les raisons pour lesquelles vous sollicitez cette aide
                    </label>
                    <textarea rows="5" name="raisons" required className={field} onChange={update} onBlur={blur}></textarea>
                    <ErrorText name="raisons" />
                  </div>
                </div>
              </div>

              {/* Réception des fonds */}
              <div>
                <h3 className={sectionTitle}>
                  <span className="text-primary">*</span> Moyen de réception des fonds
                </h3>
                <p className="text-sm text-slate-500 mt-1">
                  Veuillez choisir votre mode de réception et fournir les informations nécessaires.
                </p>
                <div className="mt-5 space-y-5">
                  <div>
                    <label className={labelClass}>Nom de la banque</label>
                    <input name="banque" required className={field} onChange={update} onBlur={blur} />
                    <ErrorText name="banque" />
                  </div>
                  <div>
                    <label className={labelClass}>Numéro de compte bancaire</label>
                    <input name="compte" required className={field} onChange={update} onBlur={blur} />
                    <ErrorText name="compte" />
                  </div>
                  <div>
                    <label className={labelClass}>Nom du titulaire du compte</label>
                    <input name="titulaire" required className={field} onChange={update} onBlur={blur} />
                    <ErrorText name="titulaire" />
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div>
                <h3 className={sectionTitle}>
                  <span className="text-primary">*</span> Documents à joindre
                </h3>
                <div className="mt-5 space-y-5">
                  <div>
                    <label className={labelClass}>
                      Une pièce d'identité en cours de validité{' '}
                      <span className="text-slate-400 font-normal">(Recto / Verso)</span>
                    </label>
                    <input type="file" required className={fileField} />
                  </div>
                  <div>
                    <label className={labelClass}>Un justificatif de domicile récent</label>
                    <input type="file" required className={fileField} />
                  </div>
                  <div>
                    <label className={labelClass}>
                      Tout document justifiant de votre situation financière actuelle{' '}
                      <span className="text-slate-400 font-normal">(ex. : fiches de paie, avis d'imposition)</span>
                    </label>
                    <input type="file" required className={fileField} />
                  </div>
                </div>
              </div>

              {/* Consentement RGPD */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 accent-primary w-4 h-4"
                  />
                  <span className="text-sm text-slate-700">
                    J'accepte le traitement de mes données personnelles conformément à la{' '}
                    <Link to="/confidentialite" className="text-primary underline font-medium">
                      politique de confidentialité
                    </Link>{' '}
                    de l'Association Étincelle.
                  </span>
                </label>
              </div>

              {/* Notice direction */}
              <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6">
                <p className="font-bold text-primary">DIRECTION DE L'ASSOCIATION ETINCELLE</p>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  NB : Veuillez remplir ce formulaire avec des informations exactes. Des frais uniques
                  sont requis pour l'établissement de votre dossier. Après paiement, votre demande
                  sera traitée rapidement, et vous recevrez votre financement dans les heures suivantes.
                </p>
              </div>

              <button type="submit" className="btn-primary w-full py-4">
                Envoyer ma demande
                <i className="fa-solid fa-paper-plane"></i>
              </button>

              <p className="text-center text-xs text-slate-500 flex items-center justify-center gap-2">
                <i className="fa-solid fa-lock text-primary"></i>
                Vos informations restent strictement confidentielles.
              </p>
            </form>
          )}
        </div>

        <a
          href={contact.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-green-500 text-white px-5 py-4 rounded-full shadow-lg hover:scale-110 transition z-40 flex items-center gap-2 font-medium"
        >
          <i className="fa-brands fa-whatsapp text-xl"></i>
          WhatsApp
        </a>
      </div>
    </section>
  )
}

const fileField =
  'block w-full text-sm text-slate-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:bg-primary file:text-white file:font-medium hover:file:bg-[#9c3a61] transition cursor-pointer'
