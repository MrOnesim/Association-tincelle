/**
 * POST /api/upload — dépôt d'une image pour un article.
 *
 * L'image est écrite dans le stockage de branche Neon, ce qui évite
 * d'ajouter une dépendance externe. Le fichier est servi par
 * /api/image?key=..., et sa clé est enregistrée dans l'article.
 *
 * Points de contrôle :
 *  - session valide obligatoire ;
 *  - types réellement acceptés, vérifiés sur le contenu du fichier et
 *    non sur son nom ;
 *  - taille bornée ;
 *  - le nom fourni sert à générer la clé, jamais à écrire un chemin.
 */
import { db, readSession } from './_auth.js'

const MAX_BYTES = 4 * 1024 * 1024 // 4 Mo
const ALLOWED = { 'image/jpeg': 'jpg', 'image/png': 'png', 'image/webp': 'webp' }

/** Vérifie la signature réelle du fichier, indépendamment de son nom. */
function sniffType(buffer) {
  if (buffer.length < 12) return null
  // JPEG : FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return 'image/jpeg'
  // PNG : 89 50 4E 47 0D 0A 1A 0A
  if (
    buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
  ) {
    return 'image/png'
  }
  // WEBP : « RIFF » … « WEBP »
  if (buffer.subarray(0, 4).toString('ascii') === 'RIFF' && buffer.subarray(8, 12).toString('ascii') === 'WEBP') {
    return 'image/webp'
  }
  return null
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Méthode non autorisée.' })
  }

  const session = await readSession(req).catch((err) => {
    console.error('[api/upload] session :', err.message)
    return null
  })
  if (!session) {
    return res.status(401).json({ error: 'Session expirée, reconnectez-vous.' })
  }

  try {
    const { filename, dataBase64 } = req.body || {}

    if (typeof dataBase64 !== 'string' || !dataBase64) {
      return res.status(400).json({ error: 'Aucune image reçue.' })
    }

    const buffer = Buffer.from(dataBase64, 'base64')

    if (buffer.length === 0) {
      return res.status(400).json({ error: 'Image vide.' })
    }
    if (buffer.length > MAX_BYTES) {
      return res
        .status(413)
        .json({ error: `Image trop lourde (${(buffer.length / 1048576).toFixed(1)} Mo, maximum 4 Mo).` })
    }

    const sniffed = sniffType(buffer)
    if (!sniffed || !ALLOWED[sniffed]) {
      return res.status(415).json({ error: 'Format accepté : JPEG, PNG ou WebP.' })
    }

    // Clé construite à partir d'un nom assaini : jamais de chemin fourni
    // par le client, donc pas d'écriture hors du stockage.
    const rawBase = String(filename || 'image')
      .replace(/\.[^.]+$/, '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 50)
    const base = rawBase || 'image'
    const stamp = new Date().toISOString().slice(0, 10)
    const key = `articles/${stamp}-${base}.${ALLOWED[sniffed]}`

    await db().query(
      `insert into images (key, data, mime_type, created_at)
       values ($1, $2, $3, now())
       on conflict (key) do update set data = excluded.data, created_at = now()`,
      [key, buffer, sniffed],
    )

    res.status(200).json({ ok: true, path: `/api/image?key=${encodeURIComponent(key)}`, key })
  } catch (err) {
    console.error('[api/upload]', err.message)
    res.status(500).json({ error: 'Envoi impossible.' })
  }
}