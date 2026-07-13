import PageHeader from '../components/PageHeader'
import About from '../components/About'
import Commitments from '../components/Commitments'
import Stats from '../components/Stats'
import CtaBanner from '../components/CtaBanner'
import Reveal from '../components/Reveal'

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="À propos"
        title="Une association au service de votre autonomie"
        description="Découvrez qui nous sommes, nos valeurs et notre engagement auprès des bénéficiaires."
      />
      <Reveal><About /></Reveal>
      <Reveal><Commitments /></Reveal>
      <Reveal><Stats /></Reveal>
      <Reveal><CtaBanner /></Reveal>
    </>
  )
}
