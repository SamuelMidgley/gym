import { useParams } from 'react-router-dom'

export default function Workout() {
  const { workoutId } = useParams()

  console.log(workoutId)
  return <h1>{workoutId}</h1>
}
