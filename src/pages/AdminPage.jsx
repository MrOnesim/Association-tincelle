import { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import Seo from '../components/Seo'
import AdminLogin from '../components/AdminLogin'
import AdminEditor from '../components/AdminEditor'
import { SUPABASE_CONFIGURED } from '../data/posts'

export default function AdminPage() {
  const [signedIn, setSignedIn] = useState(false)
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    // Tant qu'un compte administrateur n'existe pas en base, l'écran de
    // connexion s'affiche et l'éditeur reste hors d'atteinte.
    setSignedIn(false)
  }, [])

  return (
    <>
      <Seo
        title="Espace d'administration | Association Étincelle"
        description="Espace réservé à l'équipe de l'association."
        noindex
      />

      <PageHeader
        eyebrow="Administration"
        title="Espace d’administration"
        description="Rédaction et publication des articles du blog."
      />

      <section className="relative py-16 sm:py-20">
        <div className="container-x max-w-3xl">
          {!signedIn ? (
            <AdminLogin onSignedIn={() => setSignedIn(true)} />
          ) : (
            <div className="space-y-10">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-ink/8 bg-white p-5 shadow-soft">
                <p className="text-sm font-semibold text-ink">Connecté</p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setEditing(null)}
                    className="btn-outline text-sm"
                  >
                    Nouvel article
                  </button>
                  <button
                    type="button"
                    onClick={async () => {
                      const { signOut } = await import('../data/supabase')
                      await signOut()
                      sessionStorage.clear()
                      setSignedIn(false)
                    }}
                    className="btn-outline text-sm"
                  >
                    Déconnexion
                  </button>
                </div>
              </div>

              {SUPABASE_CONFIGURED ? (
                <AdminEditor
                  initialPost={editing}
                  onSaved={() => setEditing(null)}
                  onCancel={() => setEditing(null)}
                />
              ) : (
                <div className="rounded-2xl border border-ink/8 bg-white p-8 text-center">
                  <h2 className="font-display text-xl font-semibold text-ink">
                    Éditeur indisponible
                  </h2>
                  <p className="mt-3 leading-relaxed text-muted">
                    L&apos;éditeur s&apos;active une fois Supabase configuré.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  )
}