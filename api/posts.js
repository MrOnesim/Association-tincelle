/**
 * GET /api/posts — articles publiés, en lecture publique.
 *
 * Sert au site lorsque le JavaScript s'exécute. Les brouillons ne sont
 * jamais renvoyés : la condition vit dans la requête SQL elle-même, pas
 * seulement dans l'affichage.
 */
import { db } from './_auth.js'

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET')
    return res.status(405).json({ error: 'Méthode non autorisée.' })
  }

  // Un article précis : /api/posts?slug=mon-article
  const slug = typeof req.query?.slug === 'string' ? req.query.slug : null

  try {
    const pool = db()
    const { rows } = slug
      ? await pool.query(
          `select slug, title, excerpt, body, cover_image, cover_alt,
                  author, category, published_at, updated_at
             from articles
            where slug = $1 and status = 'published'
            limit 1`,
          [slug],
        )
      : await pool.query(
          `select slug, title, excerpt, body, cover_image, cover_alt,
                  author, category, published_at, updated_at
             from articles
            where status = 'published'
            order by published_at desc nulls last`,
        )

    const map = (r) => ({
      slug: r.slug,
      title: r.title,
      excerpt: r.excerpt,
      body: r.body,
      coverImage: r.cover_image,
      coverAlt: r.cover_alt,
      author: r.author,
      category: r.category,
      publishedAt: r.published_at,
      updatedAt: r.updated_at,
    })

    res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=300')
    res.status(200).json(slug ? (rows[0] ? map(rows[0]) : null) : rows.map(map))
  } catch (err) {
    console.error('[api/posts]', err.message)
    res.status(500).json({ error: 'Lecture des articles impossible.' })
  }
}