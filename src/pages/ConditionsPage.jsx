import PageHeader from '../components/PageHeader'
import Conditions from '../components/Conditions'
import CtaBanner from '../components/CtaBanner'
import Reveal from '../components/Reveal'

export default function ConditionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Conditions"
        title="Pour bénéficier de notre accompagnement"
        description="Découvrez les critères nécessaires pour présenter votre demande d'aide."
      />
      <Reveal><Conditions /></Reveal>
      <Reveal><CtaBanner /></Reveal>
    </>
  )
}
