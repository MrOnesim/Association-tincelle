import { useEffect, useState } from 'react'
import { SUPABASE_CONFIGURED } from '../data/posts'

const STORAGE_KEY = 'etincelle-admin-session'

/**
 * Connexion à l'espace d'administration par Supabase Auth.
 *
 * Tant que Supabase n'est pas configuré, le formulaire est désactivé et
 * l'écran explique comment terminer la configuration : il est préférable
 * d'un écran honnête à une fausse session qui laisserait croire à une
 * protection qui n'existe pas.
 */
export default function AdminLogin({ onSignedIn }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === '1') onSignedIn()
  }, [onSignedIn])

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const { signIn } = await import('../data/supabase')
      await signIn(email, password)

      sessionStorage.setItem(STORAGE_KEY, '1')
      onSignedIn()
    } catch (err) {
      setError(
        err?.message === 'Invalid login credentials'
          ? 'Email ou mot de passe incorrect.'
          : err?.message || 'Connexion impossible.',
      )
    } finally {
      setLoading(false)
    }
  }

  if (!SUPABASE_CONFIGURED) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-wine-600/20 bg-wine-100/40 p-8">
        <h2 className="font-display text-xl font-semibold text-ink">
          Espace d&apos;administration non configuré
        </h2>
        <p className="mt-4 leading-relaxed text-muted">
          La connexion devient disponible dès que les variables
          <code className="mx-1 rounded bg-white px-1.5 py-0.5 text-sm">VITE_SUPABASE_URL</code>
          et
          <code className="mx-1 rounded bg-white px-1.5 py-0.5 text-sm">VITE_SUPABASE_ANON_KEY</code>
          sont définies dans l&apos;environnement de déploiement.
        </p>
        <p className="mt-4 leading-relaxed text-muted">
          Tant qu&apos;elles ne le sont pas, aucun article ne peut être créé ni
          publié, et ce formulaire reste volontairement inactif plutôt que
          d&apos;offrir une fausse sécurité.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-5">
      <div>
        <label htmlFor="admin-email" className="mb-2 block text-sm font-semibold text-ink">
          Adresse e-mail
        </label>
        <input
          id="admin-email"
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-xl border border-ink/12 bg-white px-4 py-3.5 text-ink transition focus:border-wine-600 focus:outline-none focus:ring-2 focus:ring-wine-600/20"
        />
      </div>

      <div>
        <label htmlFor="admin-password" className="mb-2 block text-sm font-semibold text-ink">
          Mot de passe
        </label>
        <input
          id="admin-password"
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-xl border border-ink/12 bg-white px-4 py-3.5 text-ink transition focus:border-wine-600 focus:outline-none focus:ring-2 focus:ring-wine-600/20"
        />
      </div>

      {error && (
        <p role="alert" className="flex items-center gap-2 text-sm font-semibold text-red-600">
          <i className="fa-solid fa-circle-exclamation" />
          {error}
        </p>
      )}

      <button type="submit" disabled={loading} className="btn-primary w-full disabled:opacity-60">
        {loading ? 'Connexion…' : 'Se connecter'}
      </button>
    </form>
  )
}