import { useEffect, useState } from 'react'
import { saveArticle as apiSaveArticle, deleteArticle as apiDeleteArticle, slugify } from '../data/posts'

const emptyDraft = () => ({
  slug: '',
  title: '',
  excerpt: '',
  body: '',
  coverImage: '',
  coverAlt: '',
  author: 'Association Étincelle',
  category: 'Général',
  status: 'draft',
  publishedAt: new Date().toISOString().slice(0, 10),
})

const input =
  'w-full rounded-xl border border-ink/12 bg-white px-4 py-3.5 text-ink transition focus:border-wine-600 focus:outline-none focus:ring-2 focus:ring-wine-600/20'
const label = 'mb-2 block text-sm font-semibold text-ink'

/**
 * Éditeur d'articles.
 *
 * L'écriture passe par la REST API de Supabase avec la clé de session de
 * l'utilisateur connecté : c'est la règle RLS de la base qui autorise, et
 * non l'interface. Masquer un bouton ici n'aurait valeur que cosmétique.
 */
export default function AdminEditor({ initialPost, onSaved, onCancel }) {
  const [draft, setDraft] = useState(emptyDraft)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    if (initialPost) setDraft({ ...emptyDraft(), ...initialPost })
    else setDraft(emptyDraft())
  }, [initialPost])

  const update = (field) => (event) =>
    setDraft((d) => ({ ...d, [field]: event.target.value }))

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSaving(true)
    setMessage(null)

    try {
      const payload = {
        slug: draft.slug.trim().toLowerCase(),
        title: draft.title.trim(),
        excerpt: draft.excerpt.trim(),
        body: draft.body,
        coverImage: draft.coverImage.trim() || null,
        coverAlt: draft.coverAlt.trim() || null,
        author: draft.author.trim() || 'Association Étincelle',
        category: draft.category.trim() || 'Général',
        status: draft.status,
        publishedAt: draft.publishedAt || null,
      }

      const result = await apiSaveArticle(payload)
      const record = result.article

      setMessage({
        type: 'success',
        text: record?.slug
          ? `Article enregistré. Il apparaîtra sur le site au prochain déploiement : /blog/${record.slug}`
          : 'Article enregistré.',
      })
      onSaved?.(record)
    } catch (err) {
      setMessage({ type: 'error', text: err.message || 'Enregistrement impossible.' })
    } finally {
      setSaving(false)
    }
  }

  /** Remplit l'identifiant d'URL à partir du titre, tant qu'il est vide. */
  const handleTitleChange = (event) => {
    const title = event.target.value
    setDraft((d) => ({
      ...d,
      title,
      slug: d.slugTouched ? d.slug : slugify(title),
    }))
  }

  const handleSlugChange = (event) => {
    setDraft((d) => ({ ...d, slug: event.target.value, slugTouched: true }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="a-title" className={label}>
            Titre
          </label>
          <input id="a-title" required value={draft.title} onChange={handleTitleChange} className={input} />
        </div>

        <div>
          <label htmlFor="a-slug" className={label}>
            Identifiant d&apos;URL
          </label>
          <input
            id="a-slug"
            required
            value={draft.slug}
            onChange={handleSlugChange}
            placeholder="mon-article"
            className={input}
          />
          <p className="mt-1.5 text-xs text-muted">
            Lettre minuscule, chiffres et tirets uniquement.
          </p>
        </div>

        <div>
          <label htmlFor="a-category" className={label}>
            Catégorie
          </label>
          <input id="a-category" value={draft.category} onChange={update('category')} className={input} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="a-excerpt" className={label}>
            Chapô (affiché dans la liste et sur les réseaux)
          </label>
          <textarea id="a-excerpt" rows={3} value={draft.excerpt} onChange={update('excerpt')} className={input} />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="a-body" className={label}>
            Contenu
          </label>
          <textarea
            id="a-body"
            rows={18}
            required
            value={draft.body}
            onChange={update('body')}
            placeholder={'## Premier chapitre\n\nUn paragraphe.\n\n## Second chapitre\n\nUn autre paragraphe.'}
            className={`${input} font-mono text-sm`}
          />
          <p className="mt-1.5 text-xs text-muted">
            Une ligne commençant par <code>##</code> devient un sous-titre, les
            lignes vides séparent les paragraphes.
          </p>
        </div>

        <div>
          <label htmlFor="a-cover" className={label}>
            Image de couverture (chemin)
          </label>
          <input
            id="a-cover"
            value={draft.coverImage}
            onChange={update('coverImage')}
            placeholder="/assets/opt/encaisser.webp"
            className={input}
          />
        </div>

        <div>
          <label htmlFor="a-cover-alt" className={label}>
            Texte alternatif de l&apos;image
          </label>
          <input id="a-cover-alt" value={draft.coverAlt} onChange={update('coverAlt')} className={input} />
        </div>

        <div>
          <label htmlFor="a-author" className={label}>
            Auteur
          </label>
          <input id="a-author" value={draft.author} onChange={update('author')} className={input} />
        </div>

        <div>
          <label htmlFor="a-date" className={label}>
            Date de publication
          </label>
          <input
            id="a-date"
            type="date"
            value={draft.publishedAt}
            onChange={update('publishedAt')}
            className={input}
          />
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="a-status" className={label}>
            Statut
          </label>
          <select id="a-status" value={draft.status} onChange={update('status')} className={input}>
            <option value="draft">Brouillon (non visible sur le site)</option>
            <option value="published">Publié (visible après déploiement)</option>
          </select>
        </div>
      </div>

      {message && (
        <p
          role="status"
          className={`flex items-start gap-2 rounded-xl p-4 text-sm font-semibold ${
            message.type === 'success' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
          }`}
        >
          <i
            className={`fa-solid ${
              message.type === 'success' ? 'fa-circle-check' : 'fa-circle-exclamation'
            } mt-0.5`}
          />
          {message.text}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
          {saving ? 'Enregistrement…' : 'Enregistrer l’article'}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="btn-outline">
            Annuler
          </button>
        )}
      </div>
    </form>
  )
}