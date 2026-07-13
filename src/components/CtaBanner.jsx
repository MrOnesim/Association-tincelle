import { Link } from 'react-router-dom'

export default function CtaBanner() {
  return (
    <section className="py-20 bg-white">
      <div className="container-x">
        <div className="bg-primary rounded-3xl px-8 py-12 sm:px-14 text-center text-white relative overflow-hidden">
          <div className="absolute -top-16 -right-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-accent/20 rounded-full blur-3xl"></div>
          <h2 className="relative text-2xl sm:text-3xl font-bold">Prêt à concrétiser votre projet ?</h2>
          <p className="relative mt-3 text-white/85 max-w-xl mx-auto">
            Déposez votre demande en quelques minutes. Notre équipe vous accompagne avec
            transparence et confidentialité.
          </p>
          <Link
            to="/demande"
            className="relative inline-flex items-center gap-2 bg-white text-primary px-7 py-3.5 rounded-xl font-semibold mt-7 hover:bg-slate-100 transition"
          >
            Déposer une demande
            <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </section>
  )
}
