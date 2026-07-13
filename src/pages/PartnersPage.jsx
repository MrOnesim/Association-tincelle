import PageHeader from '../components/PageHeader'
import Partners from '../components/Partners'
import CtaBanner from '../components/CtaBanner'
import Reveal from '../components/Reveal'

export default function PartnersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Partenariats"
        title="Ils construisent avec nous"
        description="Nous collaborons avec des acteurs engagés pour amplifier notre impact sur le terrain."
      />
      <Reveal><Partners /></Reveal>
      <Reveal><CtaBanner /></Reveal>
    </>
  )
}
