/**
 * POST /api/login — connexion de l'administrateur.
 *
 * Le message d'erreur est volontairement identique que l'adresse soit
 * inconnue ou le mot de passe faux : distinguer les deux permettrait de
 * découvrir quelles adresses ont un compte.
 */
import { db, verifyPassword, createSession } from './_auth.js'

const GENERIC_ERROR = 'Identifiants incorrects.'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Méthode non autorisée.' })
  }

  const email = String(req.body?.email || '').trim().toLowerCase()
  const password = String(req.body?.password || '')

  if (!email || !password) {
    return res.status(400).json({ error: GENERIC_ERROR })
  }

  // Filet de sécurité : même si un compte était ajouté par erreur en
  // base, ADMIN_EMAIL désigne le seul compte autorisé à publier.
  const allowed = (process.env.ADMIN_EMAIL || '').trim().toLowerCase()
  if (allowed && email !== allowed) {
    console.warn(`[api/login] tentative depuis une adresse non autorisée : ${email}`)
    return res.status(403).json({ error: GENERIC_ERROR })
  }

  try {
    const { rows } = await db().query(
      `select email, password_hash from admin_users where email = $1`,
      [email],
    )

    const user = rows[0]
    // On vérifie le mot de passe même sans compte trouvé, afin que le
    // temps de réponse ne révèle pas l'existence du compte.
    const valid = user
      ? verifyPassword(password, user.password_hash)
      : verifyPassword(password, '00'.repeat(16) + ':' + '00'.repeat(64))

    if (!user || !valid) {
      return res.status(401).json({ error: GENERIC_ERROR })
    }

    await createSession(res, user.email)
    res.status(200).json({ ok: true, email: user.email })
  } catch (err) {
    console.error('[api/login]', err.message)
    res.status(500).json({ error: 'Connexion impossible.' })
  }
}