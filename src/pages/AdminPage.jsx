import { useEffect, useState } from 'react'
import PageHeader from '../components/PageHeader'
import Seo from '../components/Seo'
import AdminLogin from '../components/AdminLogin'
import AdminEditor from '../components/AdminEditor'
import AdminArticleList from '../components/AdminArticleList'
import { checkSession, signOut } from '../data/posts'

export default function AdminPage() {
  const [state, setState] = useState('checking') // checking | out | in
  const [email, setEmail] = useState('')
  const [editing, setEditing] = useState(null)

  useEffect(() => {
    checkSession().then((session) => {
      if (session?.authenticated) {
        setEmail(session.email)
        setState('in')
      } else {
        setState('out')
      }
    })
  }, [])

  const handleSignedIn = (data) => {
    setEmail(data?.email || '')
    setState('in')
  }

  const handleSignOut = async () => {
    await signOut()
    setState('out')
  }

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
          {state === 'checking' && (
            <p className="text-center text-muted">Vérification de la session…</p>
          )}

          {state === 'out' && <AdminLogin onSignedIn={handleSignedIn} />}

          {state === 'in' && (
            <div className="space-y-10">
              <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-ink/8 bg-white p-5 shadow-soft">
                <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                  <i className="fa-solid fa-circle-check text-emerald-600" />
                  Connecté en tant que <span className="font-bold">{email}</span>
                </p>
                <button type="button" onClick={handleSignOut} className="btn-outline text-sm">
                  Déconnexion
                </button>
              </div>

              <AdminArticleList onEdit={setEditing} onChanged={() => {}} />

              <div>
                <h2 className="font-display text-xl font-semibold text-ink">
                  {editing ? `Modifier : ${editing.title}` : 'Nouvel article'}
                </h2>
                <div className="mt-5">
                  <AdminEditor
                    initialPost={editing}
                    onSaved={() => setEditing(null)}
                    onCancel={() => setEditing(null)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}