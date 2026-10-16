/**
 * Crée ou met à jour le compte administrateur du blog.
 *
 * Le mot de passe n'est jamais stocké : seule son empreinte dérivée par
 * scrypt est écrite en base. Le mot de passe en clair n'est affiché qu'une
 * seule fois, à la création.
 *
 * Usage :
 *   node scripts/create-admin.mjs "mot-de-pass" [email]
 */
import crypto from 'node:crypto'

const password = process.argv[2]
const email = (process.argv[3] || 'aideassociationetincelle@gmail.com')
  .trim()
  .toLowerCase()

if (!password) {
  console.error('Usage : node scripts/create-admin.mjs "mot-de-pass" [email]')
  process.exit(1)
}

if (password.length < 12) {
  console.error('Mot de passe trop court : 12 caractères minimum.')
  process.exit(1)
}

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL absente : impossible de se connecter à la base.')
  process.exit(1)
}

const salt = crypto.randomBytes(16)
const derived = crypto.scryptSync(password, salt, 64)
const hash = `${salt.toString('hex')}:${derived.toString('hex')}`

const pg = await import('pg')
const pool = new pg.default.Pool({
  connectionString: process.env.DATABASE_URL,
  max: 1,
  ssl: process.env.DATABASE_URL.includes('sslmode=require')
    ? { rejectUnauthorized: false }
    : undefined,
})

await pool.query(
  `insert into admin_users (email, password_hash)
   values ($1, $2)
   on conflict (email) do update set password_hash = excluded.password_hash`,
  [email, hash],
)

// Toute session précédente de ce compte devient caduque.
await pool.query(`delete from admin_sessions where email = $1`, [email])

await pool.end()

console.log(`Compte administrateur « ${email} » enregistré.`)
console.log('Les sessions précédentes ont été fermées.')