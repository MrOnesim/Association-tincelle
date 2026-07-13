import PageHeader from '../components/PageHeader'
import Faq from '../components/Faq'
import CtaBanner from '../components/CtaBanner'
import Reveal from '../components/Reveal'

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="FAQ"
        title="Questions fréquentes"
        description="Retrouvez les réponses aux questions les plus posées par nos bénéficiaires."
      />
      <Reveal><Faq /></Reveal>
      <Reveal><CtaBanner /></Reveal>
    </>
  )
}
