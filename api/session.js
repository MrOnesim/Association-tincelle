/**
 * GET /api/session — indique si une session d'administration est ouverte.
 *
 * Ne renvoie que l'adresse e-mail de l'administrateur connecté, rien de
 * plus. Le cookie de session est HttpOnly : le JavaScript de la page ne
 * peut pas le lire, cette route est donc le seul moyen de connaître l'état
 * de la connexion depuis le navigateur.
 */
import { readSession } from './_auth.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Méthode non autorisée.' })
  }

  const session = await readSession(req).catch((err) => {
    console.error('[api/session]', err.message)
    return null
  })

  // Réponse identique que la session existe ou non : elle ne doit pas
  // permettre de tester un jeton au hasard.
  res.setHeader('Cache-Control', 'no-store')
  res.status(200).json(session ? { authenticated: true, email: session.email } : { authenticated: false })
}