import DemandForm from '../components/DemandForm'
import Location from '../components/Location'
import Reveal from '../components/Reveal'

export default function DemandPage() {
  return (
    <>
      <Reveal>
        <DemandForm />
      </Reveal>
      <Reveal>
        <Location />
      </Reveal>
    </>
  )
}
