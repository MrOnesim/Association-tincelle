import { SUPABASE_CONFIGURED } from './posts'

/**
 * Client Supabase chargé paresseusement.
 *
 * Ce module n'est importé que dans l'espace d'administration, jamais dans
 * le blog public : le site reste ainsi sans appel réseau inutile pour le
 * visiteur, et la clé anonyme n'est pas requise pour lire les articles.
 */
const url = SUPABASE_CONFIGURED ? import.meta.env.VITE_SUPABASE_URL : null
const anonKey = SUPABASE_CONFIGURED ? import.meta.env.VITE_SUPABASE_ANON_KEY : null

let authPromise = null

/**
 * Retourne l'API Auth de supabase-js si la bibliothèque est installée.
 * L'administrateur peut travailler avec les articles sans elle ; seule la
 * connexion en dépend.
 */
async function loadAuth() {
  if (!url || !anonKey) return null
  if (!authPromise) {
    authPromise = import('@supabase/supabase-js')
      .then(({ createClient }) => createClient(url, anonKey))
      .catch(() => null)
  }
  return authPromise
}

export async function getClient() {
  return loadAuth()
}

export const supabaseConfigured = SUPABASE_CONFIGURED

export const supabaseUrl = url

/** Connexion par e-mail et mot de passe. */
export async function signIn(email, password) {
  const client = await loadAuth()
  if (!client) throw new Error('Client Supabase indisponible')
  const { data, error } = await client.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function signOut() {
  const client = await loadAuth()
  if (client) await client.auth.signOut()
}

export { url }