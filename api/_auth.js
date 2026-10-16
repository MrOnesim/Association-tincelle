/**
 * Accès PostgreSQL et authentification de l'espace d'administration.
 *
 * Ce module n'est utilisé que par les fonctions serveur (dossier /api).
 * Il ne doit jamais être importé depuis le code client : DATABASE_URL
 * donnerait un accès complet à la base s'il était exposé dans le
 * JavaScript du navigateur.
 */
import crypto from 'node:crypto'
import pg from 'pg'

const { Pool } = pg

let pool

export function db() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL absente : la base de données n’est pas configurée.')
  }
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 2,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
      ssl: process.env.DATABASE_URL.includes('sslmode=require')
        ? { rejectUnauthorized: false }
        : undefined,
    })
    pool.on('error', (err) => {
      console.error('[db] erreur du pool :', err.message)
    })
  }
  return pool
}

// ---------------------------------------------------------------- mot de passe

/**
 * Dérive un mot de passe avec scrypt.
 * Format stocké : sel (32 octets) et clé (64 octets), tous deux en hexadécimal,
 * séparés par « : ». La comparaison se fait en temps constant.
 */
export function hashPassword(password) {
  const salt = crypto.randomBytes(16)
  const derived = crypto.scryptSync(password, salt, 64)
  return `${salt.toString('hex')}:${derived.toString('hex')}`
}

export function verifyPassword(password, stored) {
  if (typeof stored !== 'string' || !stored.includes(':')) return false
  const [saltHex, keyHex] = stored.split(':')
  try {
    const salt = Buffer.from(saltHex, 'hex')
    const expected = Buffer.from(keyHex, 'hex')
    const derived = crypto.scryptSync(password, salt, expected.length)
    return crypto.timingSafeEqual(derived, expected)
  } catch {
    return false
  }
}

// -------------------------------------------------------------------- session

const SESSION_COOKIE = 'etincelle_admin'
const SESSION_DAYS = 7

/** Renvoie le cookie de session s'il est valide, sinon null. */
export async function readSession(req) {
  const token = req.cookies?.[SESSION_COOKIE]
  if (!token) return null

  // Le jeton est haché tel quel, exactement comme à la création.
  // Le décoder avant de le hacher produirait une empreinte différente
  // et aucune session ne serait jamais reconnue.
  const { rows } = await db().query(
    `select email from admin_sessions
      where token_hash = $1 and expires_at > now()`,
    [sha256(token)],
  )
  return rows.length ? { email: rows[0].email } : null
}

/** Crée une session en base et pose le cookie correspondant. */
export async function createSession(res, email) {
  const token = crypto.randomBytes(32).toString('base64url')

  await db().query(
    `insert into admin_sessions (token_hash, email, expires_at)
     values ($1, $2, now() + interval '${SESSION_DAYS} days')`,
    [sha256(token), email],
  )

  const maxAge = SESSION_DAYS * 24 * 60 * 60
  const attrs = [
    'Path=/',
    `Max-Age=${maxAge}`,
    'HttpOnly',
    'SameSite=Lax',
    // Secure : le cookie ne part pas en clair sur une connexion non chiffrée.
    ...(process.env.NODE_ENV === 'production' ? ['Secure'] : []),
  ]

  res.setHeader('Set-Cookie', [`${SESSION_COOKIE}=${token}; ${attrs.join('; ')}`])
}

/** Supprime la session en base et efface le cookie. */
export async function destroySession(req, res) {
  const token = req.cookies?.[SESSION_COOKIE]
  if (token) {
    await db().query(`delete from admin_sessions where token_hash = $1`, [sha256(token)])
  }
  res.setHeader('Set-Cookie', [
    `${SESSION_COOKIE}=; Path=/; Max-Age=0; HttpOnly; SameSite=Lax`,
  ])
}

const sha256 = (value) =>
  crypto.createHash('sha256').update(value).digest('hex')