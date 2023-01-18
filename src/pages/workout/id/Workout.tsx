import { useCallback, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import supabase from '../../../supabaseClient'

interface IWorkout {
  id: number
  name: string
  time: Date
  location?: string
}

export default function Workout() {
  const navigate = useNavigate()
  const { workoutId } = useParams()

  if (workoutId === undefined) {
    navigate('/gym/404')
  }

  const [loading, setLoading] = useState<boolean>(false)
  const [workoutData, setWorkoutData] = useState<IWorkout>()

  const getWorkout = useCallback(
    async (id: number) => {
      try {
        setLoading(true)

        const { data, error, status } = await supabase
          .from('workout')
          .select()
          .eq('id', id)
          .single()

        if (data) {
          setWorkoutData(data)
          return
        }

        navigate('/gym/404')
      } catch (error) {
        navigate('/gym/404')
      } finally {
        setLoading(false)
      }
    },
    [navigate]
  )

  useEffect(() => {
    if (workoutId === undefined) {
      navigate('/gym/404')
      return
    }

    const id = +workoutId

    if (!id) {
      navigate('/gym/404')
    }

    getWorkout(id)
  }, [workoutId, navigate, getWorkout])

  return <h1>{workoutId}</h1>
}
