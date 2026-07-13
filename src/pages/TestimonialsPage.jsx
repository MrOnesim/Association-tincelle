import PageHeader from '../components/PageHeader'
import Testimonials from '../components/Testimonials'
import CtaBanner from '../components/CtaBanner'
import Reveal from '../components/Reveal'

export default function TestimonialsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Témoignages"
        title="Ce que disent nos bénéficiaires"
        description="Des parcours accompagnés, des projets concrétisés : ils nous racontent leur expérience."
      />
      <Reveal><Testimonials /></Reveal>
      <Reveal><CtaBanner /></Reveal>
    </>
  )
}
