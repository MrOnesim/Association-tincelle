/**
 * GET /api/image?key=... — sert une image déposée par l'administration.
 *
 * Lecture publique : un article publié doit afficher sa couverture même
 * sans JavaScript, donc cette route n'exige pas de session. Seules les
 * clés présentes en base sont servies, jamais un chemin arbitraire.
 */
import { db } from './_auth.js'

const CACHE = 'public, max-age=31536000, immutable'

export default async function handler(req, res) {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.setHeader('Allow', 'GET, HEAD')
    return res.status(405).json({ error: 'Méthode non autorisée.' })
  }

  const key = typeof req.query?.key === 'string' ? req.query.key : ''

  // Forme attendue : articles/AAAA-MM-JJ-nom.ext
  if (!/^articles\/\d{4}-\d{2}-\d{2}-[a-z0-9-]{1,60}\.(jpg|png|webp)$/.test(key)) {
    return res.status(400).json({ error: 'Clé invalide.' })
  }

  try {
    const { rows } = await db().query(
      `select mime_type, data from images where key = $1`,
      [key],
    )

    if (!rows.length) return res.status(404).json({ error: 'Image introuvable.' })

    res.setHeader('Content-Type', rows[0].mime_type)
    res.setHeader('Content-Length', String(rows[0].data.length))
    res.setHeader('Cache-Control', CACHE)

    if (req.method === 'HEAD') return res.status(200).end()
    return res.status(200).send(rows[0].data)
  } catch (err) {
    console.error('[api/image]', err.message)
    res.status(500).json({ error: 'Image indisponible.' })
  }
}