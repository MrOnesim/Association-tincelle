import { useCallback, useEffect, useState } from 'react'
import { listAllArticles, getArticleForEdit, deleteArticle } from '../data/posts'

const dateFr = (iso) => {
  if (!iso) return '—'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' })
}

/**
 * Liste des articles existants, avec chargement et suppression.
 *
 * Sans elle, modifier un article supposait de retaper son identifiant
 * d'URL — et le changer cassait l'adresse déjà indexée par Google.
 */
export default function AdminArticleList({ onEdit, onChanged }) {
  const [articles, setArticles] = useState(null)
  const [error, setError] = useState('')
  const [busy, setBusy] = useState('')

  const refresh = useCallback(async () => {
    try {
      setArticles(await listAllArticles())
      setError('')
    } catch (err) {
      setArticles([])
      setError(err.message)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const handleDelete = async (slug, title) => {
    const confirmed = window.confirm(
      `Supprimer définitivement « ${title} » ?\n\nCette action est immédiate et irréversible.`,
    )
    if (!confirmed) return

    setBusy(slug)
    try {
      await deleteArticle(slug)
      await refresh()
      onChanged?.()
    } catch (err) {
      setError(err.message)
    } finally {
      setBusy('')
    }
  }

  return (
    <section className="rounded-2xl border border-ink/8 bg-white p-6 shadow-soft sm:p-7">
      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="font-display text-xl font-semibold text-ink">Articles</h2>
        <button
          type="button"
          onClick={refresh}
          className="text-sm font-bold text-wine-600 underline-offset-4 transition hover:underline"
        >
          Actualiser
        </button>
      </div>

      {error && (
        <p role="alert" className="mb-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-700">
          {error}
        </p>
      )}

      {articles === null && <p className="text-sm text-muted">Chargement…</p>}

      {articles?.length === 0 && (
        <p className="text-sm text-muted">
          Aucun article pour le moment. Écrivez le premier ci-dessous.
        </p>
      )}

      {articles?.length > 0 && (
        <ul className="divide-y divide-ink/8">
          {articles.map((a) => (
            <li key={a.slug} className="flex items-center gap-4 py-4">
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-ink">{a.title}</p>
                <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
                  <span>/blog/{a.slug}</span>
                  <span>{a.category}</span>
                  <span>{dateFr(a.publishedAt)}</span>
                </p>
              </div>

              <span
                className={`shrink-0 rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-wider ${
                  a.status === 'published'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                {a.status === 'published' ? 'Publié' : 'Brouillon'}
              </span>

              <div className="flex shrink-0 gap-2">
                <button
                  type="button"
                  onClick={async () => {
                    setBusy(a.slug)
                    try {
                      const article = await getArticleForEdit(a.slug)
                      onEdit(article)
                    } catch (err) {
                      setError(err.message)
                    } finally {
                      setBusy('')
                    }
                  }}
                  disabled={busy === a.slug}
                  className="btn-outline !px-4 !py-2 text-sm disabled:opacity-50"
                >
                  {busy === a.slug ? '…' : 'Modifier'}
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(a.slug, a.title)}
                  disabled={busy === a.slug}
                  aria-label={`Supprimer ${a.title}`}
                  className="grid h-9 w-9 place-items-center rounded-full border border-ink/10 text-muted transition hover:border-red-300 hover:text-red-600 disabled:opacity-50"
                >
                  <i className="fa-solid fa-trash text-xs" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="mt-5 border-t border-ink/8 pt-4 text-xs leading-relaxed text-muted">
        Un article publié n&apos;apparaît sur le site qu&apos;au prochain déploiement.
        Ne changez plus l&apos;identifiant d&apos;URL d&apos;un article déjà publié :
        son adresse changerait et son référencement serait perdu.
      </p>
    </section>
  )
}