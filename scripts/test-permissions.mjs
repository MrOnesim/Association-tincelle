/**
 * Vérifie que le rôle applicatif (celui utilisé par l'API) ne peut pas
 * modifier les comptes administrateur, même si l'API était compromise.
 *
 * Usage : node --env-file=.env scripts/test-permissions.mjs
 */
const pg = await import('pg')
const pool = new pg.default.Pool({
  connectionString: process.env.DATABASE_URL,
  max: 1,
  ssl: process.env.DATABASE_URL.includes('sslmode=require')
    ? { rejectUnauthorized: false }
    : undefined,
})

let fail = 0
const check = (label, ok, detail = '') => {
  console.log(`${ok ? 'OK  ' : 'FAIL'}  ${label}${detail ? ` — ${detail}` : ''}`)
  if (!ok) fail += 1
}

const attempt = async (label, sql, params) => {
  try {
    await pool.query(sql, params)
    check(label, false, 'a réussi — le rôle a un droit en trop')
  } catch (err) {
    // 42501 = permission denied : le résultat attendu.
    check(label, err.code === '42501', `code ${err.code}`)
  }
}

// Droits qui ne doivent surtout pas exister.
await attempt(
  'ne peut pas changer un mot de passe',
  `update admin_users set password_hash = '00:00' where email = $1`,
  ['aideassociationetincelle@gmail.com'],
)

await attempt(
  'ne peut pas créer de compte administrateur',
  `insert into admin_users (email, password_hash) values ($1, $2)`,
  ['pirate@example.com', '00:00'],
)

await attempt(
  'ne peut pas supprimer un compte administrateur',
  `delete from admin_users where email = $1`,
  ['aideassociationetincelle@gmail.com'],
)

// La suppression globale des sessions est un risque ASSUMÉ, pas un défaut.
//
// blog_app a besoin de DELETE sur admin_sessions pour que la déconnexion
// invalide réellement le jeton côté serveur : sans ce droit, un cookie
// volé resterait valide pendant sept jours après le logout.
//
// Ce que ce droit permet en cas d'injection SQL : déconnecter
// l'administrateur. Ce qu'il ne permet PAS : lire un mot de passe, créer
// un compte, ou publier un article. Une gêne, pas une compromission.
//
// Refuser ce droit serait une régression de sécurité bien plus grave.
{
  try {
    await pool.query(`delete from admin_sessions`)
    check(
      'peut supprimer des sessions (risque assumé : gêne, pas compromission)',
      true,
      'voir le commentaire dans ce fichier',
    )
  } catch (err) {
    check('suppression de session', false, err.code)
  }
}

// Droits nécessaires au fonctionnement : doivent réussir.
try {
  await pool.query(`select count(*) from articles`)
  check('peut lire les articles', true)
} catch (err) {
  check('peut lire les articles', false, err.message)
}

try {
  await pool.query(`select email from admin_users limit 1`)
  check('peut vérifier un identifiant à la connexion', true)
} catch (err) {
  check('peut vérifier un identifiant à la connexion', false, err.message)
}

await pool.end()
console.log(`\n${fail === 0 ? 'Permissions correctes.' : 'ÉCHEC — le rôle est trop permissif.'}`)
process.exit(fail === 0 ? 0 : 1)