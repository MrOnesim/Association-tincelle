import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <section className="py-32 bg-white">
      <div className="container-x text-center">
        <p className="text-primary font-extrabold text-7xl">404</p>
        <h1 className="mt-4 text-3xl font-bold text-slate-900">Page introuvable</h1>
        <p className="mt-3 text-slate-600">
          La page que vous recherchez n'existe pas ou a été déplacée.
        </p>
        <Link to="/" className="btn-primary mt-8 inline-flex">
          Retour à l'accueil
          <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </div>
    </section>
  )
}
