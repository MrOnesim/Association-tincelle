import { useState } from 'react'
import SectionHeading from './SectionHeading'
import { contact } from '../data/contact'

const field =
  'w-full p-4 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-white'
const labelClass = 'block text-sm font-medium text-slate-700 mb-2'
const sectionTitle = 'text-lg font-bold text-slate-900 flex items-center gap-2'
const fileField =
  'block w-full text-sm text-slate-600 file:mr-4 file:py-2.5 file:px-4 file:rounded-xl file:border-0 file:bg-primary file:text-white file:font-medium hover:file:bg-[#9c3a61] transition cursor-pointer'

export default function DemandForm() {
  const [form, setForm] = useState({
    nom: '', adresse: '', cp: '', ville: '', pays: '', tel: '', email: '',
    salarie: '', revenus: '', charge: '', dejaAide: '',
    montant: '', raisons: '',
    banque: '', compte: '', titulaire: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    const msg =
      `FORMULAIRE DE DEMANDE D'AIDE FINANCIERE - ASSOCIATION ETINCELLE\n` +
      `— INFORMATIONS PERSONNELLES —\n` +
      `Nom : ${form.nom}\n` +
      `Adresse : ${form.adresse}\n` +
      `Code postal : ${form.cp}\n` +
      `Ville : ${form.ville}\n` +
      `Pays : ${form.pays}\n` +
      `Téléphone : ${form.tel}\n` +
      `Email : ${form.email}\n\n` +
      `— SITUATION FINANCIERE —\n` +
      `Salarié(e) : ${form.salarie}\n` +
      `Revenus mensuels : ${form.revenus}\n` +
      `Personnes à charge : ${form.charge}\n` +
      `Déjà aidé : ${form.dejaAide}\n\n` +
      `— MOTIVATION —\n` +
      `Montant demandé : ${form.montant}\n` +
      `Raisons : ${form.raisons}\n\n` +
      `— RECEPTION DES FONDS —\n` +
      `Banque : ${form.banque}\n` +
      `Compte : ${form.compte}\n` +
      `Titulaire : ${form.titulaire}`
    const url = `${contact.whatsapp}?text=${encodeURIComponent(msg)}`
    window.open(url, '_blank', 'noopener,noreferrer')
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
                  'Bonjour, j\'ai rempli le formulaire de demande d\'aide financière de l\'Association Étincelle.'
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
            <form className="bg-white p-8 sm:p-10 rounded-3xl shadow-xl space-y-10" onSubmit={handleSubmit}>

              {/* Informations personnelles */}
              <div>
                <h3 className={sectionTitle}>
                  <span className="text-primary">*</span> Informations personnelles
                </h3>
                <div className="mt-5 space-y-5">
                  <div>
                    <label className={labelClass}>1. Nom complet</label>
                    <input name="nom" required className={field} onChange={update} />
                  </div>
                  <div>
                    <label className={labelClass}>2. Adresse</label>
                    <input name="adresse" required className={field} onChange={update} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className={labelClass}>3. Code postal</label>
                      <input name="cp" required className={field} onChange={update} />
                    </div>
                    <div>
                      <label className={labelClass}>4. Ville</label>
                      <input name="ville" required className={field} onChange={update} />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Pays</label>
                    <select name="pays" required className={field} onChange={update}>
                      <option value="">Choisir votre pays</option>
                      <option>Allemagne</option>
                      <option>Autriche</option>
                      <option>Belgique</option>
                      <option>Bulgarie</option>
                      <option>Chypre</option>
                      <option>Croatie</option>
                      <option>Espagne</option>
                      <option>Estonie</option>
                      <option>Finlande</option>
                      <option>France</option>
                      <option>Grèce</option>
                      <option>Irlande</option>
                      <option>Italie</option>
                      <option>Lettonie</option>
                      <option>Lituanie</option>
                      <option>Luxembourg</option>
                      <option>Malte</option>
                      <option>Pays-Bas</option>
                      <option>Portugal</option>
                      <option>Slovaquie</option>
                      <option>Slovénie</option>
                      <option>Andorre</option>
                      <option>Monaco</option>
                      <option>Saint-Marin</option>
                      <option>Vatican</option>
                      <option>Autre</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelClass}>
                      5. Numéro de téléphone <span className="text-slate-400 font-normal">(ex : +33 1 23 45 67 89)</span>
                    </label>
                    <input
                      type="tel"
                      name="tel"
                      required
                      placeholder="+33 1 23 45 67 89"
                      className={field}
                      onChange={update}
                    />
                  </div>
                  <div>
                    <label className={labelClass}>6. Adresse e-mail</label>
                    <input type="email" name="email" required className={field} onChange={update} />
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
                          <input
                            type="radio"
                            name="salarie"
                            value={o}
                            required
                            onChange={update}
                            className="accent-primary w-4 h-4"
                          />
                          <span>{o}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>8. Revenus mensuels</label>
                    <input name="revenus" required className={field} onChange={update} />
                  </div>
                  <div>
                    <label className={labelClass}>9. Nombre de personnes à charge</label>
                    <input type="number" min="0" name="charge" required className={field} onChange={update} />
                  </div>
                  <div>
                    <label className={labelClass}>
                      10. Avez-vous déjà bénéficié d'une aide financière de l'Association Étincelle ?
                    </label>
                    <div className="flex gap-6">
                      {['Oui', 'Non'].map((o) => (
                        <label key={o} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="dejaAide"
                            value={o}
                            required
                            onChange={update}
                            className="accent-primary w-4 h-4"
                          />
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
                    <input type="number" min="0" name="montant" required className={field} onChange={update} />
                  </div>
                  <div>
                    <label className={labelClass}>
                      12. Décrivez en quelques lignes les raisons pour lesquelles vous sollicitez cette aide
                    </label>
                    <textarea
                      rows="5"
                      name="raisons"
                      required
                      className={field}
                      onChange={update}
                    ></textarea>
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
                    <input name="banque" required className={field} onChange={update} />
                  </div>
                  <div>
                    <label className={labelClass}>Numéro de compte bancaire</label>
                    <input name="compte" required className={field} onChange={update} />
                  </div>
                  <div>
                    <label className={labelClass}>Nom du titulaire du compte</label>
                    <input name="titulaire" required className={field} onChange={update} />
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
          className="fixed bottom-4 right-4 md:bottom-6 md:right-6 bg-green-500 text-white px-5 py-4 rounded-full shadow-lg hover:scale-110 transition z-50 flex items-center gap-2 font-medium"
        >
          <i className="fa-brands fa-whatsapp text-xl"></i>
          WhatsApp
        </a>
      </div>
    </section>
  )
}
