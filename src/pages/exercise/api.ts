interface IExercise {
  id: number
  name: string
  onerepmax: number
  logs: IExerciseLog[]
}

export interface IExerciseLog {
  date: Date
  sets: ISet[]
}

export interface ISet {
  set: number
  reps: number
  weight: number
}

export default function getExercise(id: number) {
  const exercise: IExercise = {
    id,
    name: 'Bench Press',
    onerepmax: 80,
    logs: [
      {
        date: new Date(),
        sets: [
          { set: 1, reps: 10, weight: 60 },
          { set: 2, reps: 10, weight: 70 },
          { set: 3, reps: 4, weight: 75 },
          { set: 4, reps: 1, weight: 80 },
        ],
      },
      {
        date: new Date(Date.now() - 604800000),
        sets: [
          { set: 1, reps: 12, weight: 50 },
          { set: 2, reps: 10, weight: 60 },
          { set: 3, reps: 4, weight: 70 },
        ],
      },
      {
        date: new Date(Date.now() - 604800000 * 2),
        sets: [
          { set: 1, reps: 14, weight: 40 },
          { set: 2, reps: 12, weight: 50 },
          { set: 3, reps: 5, weight: 65 },
        ],
      },
      {
        date: new Date(Date.now() - 604800000 * 3),
        sets: [
          { set: 1, reps: 12, weight: 40 },
          { set: 2, reps: 10, weight: 50 },
          { set: 3, reps: 3, weight: 60 },
        ],
      },
    ],
  }

  return exercise
}
