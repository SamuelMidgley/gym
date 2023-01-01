export interface IWorkout {
  id: number
  name: string
  location: string
  date: Date
  type: 'workout'
}

interface IWorkoutSet {
  exerciseId: number
  exercise: string
  reps: number
  weight: number
}

interface IWorkoutFull extends IWorkout {
  sets: IWorkoutSet[]
}

const MOCK_WORKOUT: IWorkout = {
  id: 2,
  name: 'Back & Biceps',
  location: 'One XPS Fitness',
  date: new Date(),
  type: 'workout',
}

export default function getWorkout(id: number): IWorkout {
  MOCK_WORKOUT.id = id
  return MOCK_WORKOUT
}
