/**
 * GET /api/admin/articles — liste complète des articles pour l'administration.
 *
 * Exige une session valide et renvoie les brouillons comme les publiés.
 * Aucune donnée n'est lue avant la vérification de session.
 */
import { db, readSession } from '../_auth.js'

export default async function handler(req, res) {
  const session = await readSession(req).catch((err) => {
    console.error('[api/admin/articles] session :', err.message)
    return null
  })

  if (!session) {
    return res.status(401).json({ error: 'Session expirée, reconnectez-vous.' })
  }

  // Un article précis, y compris brouillon : /api/admin/article?slug=...
  if (req.query?.slug) {
    if (req.method !== 'GET') {
      res.setHeader('Allow', 'GET')
      return res.status(405).json({ error: 'Méthode non autorisée.' })
    }

    const { rows } = await db().query(
      `select slug, title, excerpt, body, cover_image, cover_alt,
              author, category, status, published_at
         from articles
        where slug = $1
        limit 1`,
      [String(req.query.slug)],
    )

    if (!rows.length) return res.status(404).json({ error: 'Article introuvable.' })

    const r = rows[0]
    res.setHeader('Cache-Control', 'no-store')
    return res.status(200).json({
      slug: r.slug,
      title: r.title,
      excerpt: r.excerpt,
      body: r.body,
      coverImage: r.cover_image,
      coverAlt: r.cover_alt,
      author: r.author,
      category: r.category,
      status: r.status,
      publishedAt: r.published_at,
    })
  }

  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Méthode non autorisée.' })
  }

  try {
    const { rows } = await db().query(
      `select slug, title, category, status, published_at, updated_at, created_at
         from articles
        order by coalesce(published_at, created_at) desc`,
    )

    res.setHeader('Cache-Control', 'no-store')
    res.status(200).json(
      rows.map((r) => ({
        slug: r.slug,
        title: r.title,
        category: r.category,
        status: r.status,
        publishedAt: r.published_at,
        updatedAt: r.updated_at,
      })),
    )
  } catch (err) {
    console.error('[api/admin/articles]', err.message)
    res.status(500).json({ error: 'Lecture impossible.' })
  }
}