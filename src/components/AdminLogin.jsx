import { useEffect, useState } from 'react'
import { signIn as apiSignIn } from '../data/posts'

/**
 * Formulaire de connexion à l'espace d'administration.
 *
 * L'authentification est vérifiée par le serveur : le mot de passe n'est
 * jamais comparé dans le navigateur, et le cookie de session est HttpOnly,
 * donc inaccessible au JavaScript de la page.
 */
export default function AdminLogin({ onSignedIn }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await apiSignIn(email.trim(), password)
      onSignedIn?.(data)
    } catch (err) {
      setError(err.message || 'Connexion impossible.')
    } finally {
      setLoading(false)
    }
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
          autoCapitalize="none"
          autoCorrect="off"
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

      <p className="text-center text-xs leading-relaxed text-muted">
        Accès réservé à l&apos;équipe. Les tentatives sont enregistrées côté serveur.
      </p>
    </form>
  )
}