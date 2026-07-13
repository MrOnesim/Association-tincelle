import PageHeader from '../components/PageHeader'
import Programs from '../components/Programs'
import Process from '../components/Process'
import CtaBanner from '../components/CtaBanner'
import Reveal from '../components/Reveal'

export default function ProgramsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Nos programmes"
        title="Des solutions adaptées à chaque besoin"
        description="Études, entrepreneuriat, projets personnels ou accompagnement : trouvez le dispositif fait pour vous."
      />
      <Reveal><Programs /></Reveal>
      <Reveal><Process /></Reveal>
      <Reveal><CtaBanner /></Reveal>
    </>
  )
}
