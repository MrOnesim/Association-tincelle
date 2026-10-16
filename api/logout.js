/**
 * POST /api/logout — ferme la session en cours.
 */
import { destroySession, readSession } from './_auth.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Méthode non autorisée.' })
  }

  try {
    await destroySession(req, res)
    res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[api/logout]', err.message)
    res.status(500).json({ error: 'Déconnexion impossible.' })
  }
}