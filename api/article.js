/**
 * Écriture d'un article, réservée à une session valide.
 *
 * Deux points de sécurité à ne pas contourner :
 *  - la vérification de session est faite ici, côté serveur ;
 *  - le rôle PostgreSQL utilisé par la fonction est volontairement limité
 *    à la table articles (voir README-admin), il n'a aucun droit sur
 *    admin_users ni admin_sessions.
 */
import { db, readSession } from './_auth.js'

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export default async function handler(req, res) {
  if (req.method !== 'POST' && req.method !== 'DELETE') {
    res.setHeader('Allow', 'POST, DELETE')
    return res.status(405).json({ error: 'Méthode non autorisée.' })
  }

  // Toute requête non authentifiée est refusée avant toute lecture de données.
  const session = await readSession(req).catch((err) => {
    console.error('[api/article] lecture de session :', err.message)
    return null
  })

  if (!session) {
    return res.status(401).json({ error: 'Session expirée, reconnectez-vous.' })
  }

  try {
    const pool = db()

    if (req.method === 'DELETE') {
      const slug = String(req.body?.slug || '')
      if (!slugPattern.test(slug)) {
        return res.status(400).json({ error: 'Identifiant d’article invalide.' })
      }
      const result = await pool.query(`delete from articles where slug = $1`, [slug])
      return res.status(200).json({ ok: true, removed: result.rowCount })
    }

    const body = req.body || {}
    const slug = String(body.slug || '').trim().toLowerCase()
    const title = String(body.title || '').trim()

    if (!slugPattern.test(slug)) {
      return res.status(400).json({
        error: 'Identifiant invalide : minuscules, chiffres et tirets uniquement.',
      })
    }
    if (!title) {
      return res.status(400).json({ error: 'Le titre est obligatoire.' })
    }

    // bornes défensives : évite qu'un article immense ou une image
    // inattendue ne sature la base.
    const excerpt = String(body.excerpt || '').slice(0, 400)
    const text = String(body.body || '')
    if (text.length > 100_000) {
      return res.status(400).json({ error: 'Contenu trop long (100 000 caractères maximum).' })
    }

    const status = body.status === 'published' ? 'published' : 'draft'
    const publishedAt =
      status === 'published'
        ? body.publishedAt || new Date().toISOString()
        : body.publishedAt || null

    const { rows } = await pool.query(
      `insert into articles
         (slug, title, excerpt, body, cover_image, cover_alt,
          author, category, status, published_at, updated_at)
       values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10, now())
       on conflict (slug) do update set
         title        = excluded.title,
         excerpt      = excluded.excerpt,
         body         = excluded.body,
         cover_image  = excluded.cover_image,
         cover_alt    = excluded.cover_alt,
         author       = excluded.author,
         category     = excluded.category,
         status       = excluded.status,
         published_at = excluded.published_at,
         updated_at   = now()
       returning slug, title, status, published_at`,
      [
        slug,
        title,
        excerpt,
        text,
        body.coverImage ? String(body.coverImage).slice(0, 300) : null,
        body.coverAlt ? String(body.coverAlt).slice(0, 300) : null,
        String(body.author || 'Association Étincelle').slice(0, 120),
        String(body.category || 'Général').slice(0, 80),
        status,
        publishedAt,
      ],
    )

    res.status(200).json({ ok: true, article: rows[0] })
  } catch (err) {
    if (err.code === '23505') {
      return res.status(409).json({ error: 'Un article utilise déjà cet identifiant.' })
    }
    console.error('[api/article]', err.message)
    res.status(500).json({ error: 'Enregistrement impossible.' })
  }
}