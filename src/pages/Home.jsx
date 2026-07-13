import Hero from '../components/Hero'
import Programs from '../components/Programs'
import Commitments from '../components/Commitments'
import Stats from '../components/Stats'
import Testimonials from '../components/Testimonials'
import Partners from '../components/Partners'
import Gallery from '../components/Gallery'
import CtaBanner from '../components/CtaBanner'
import Reveal from '../components/Reveal'

export default function Home() {
  return (
    <>
      <Hero />
      <Reveal><Programs /></Reveal>
      <Reveal><Commitments /></Reveal>

      <Reveal>
        <section className="py-16 bg-white">
          <div className="container-x">
            <div className="relative rounded-3xl overflow-hidden shadow-xl">
              <img
                src="/assets/Famille IA.png"
                alt="La communauté de l'Association Étincelle"
                className="w-full h-[340px] sm:h-[440px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-primary/85 via-primary/50 to-transparent flex items-center">
                <div className="px-8 sm:px-14 max-w-xl text-white">
                  <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
                    Une communauté qui avance ensemble
                  </h2>
                  <p className="mt-4 text-white/90 leading-relaxed">
                    Chaque bénéficiaire compte. Nous bâtissons, avec vous, des parcours durables,
                    autonomes et porteurs de sens.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal><Stats /></Reveal>
      <Reveal><Testimonials /></Reveal>
      <Reveal><Partners /></Reveal>
      <Reveal><Gallery /></Reveal>
      <Reveal><CtaBanner /></Reveal>
    </>
  )
}
