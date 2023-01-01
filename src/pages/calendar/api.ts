import { IDay } from './utils'

const workouts: IDay[] = [
  {
    date: 12,
    month: 0,
  },
  {
    date: 15,
    month: 0,
  },
  {
    date: 18,
    month: 0,
  },
  {
    date: 30,
    month: 11,
  },
]

export function getWorkoutDatesFromMonth(month: number, year: number): IDay[] {
  return workouts
}

export interface CalendarWorkoutDay {
  workoutId: number
  name: string
  date: Date
  location: string
}

const MOCK_WORKOUT_DAY: CalendarWorkoutDay[] = [
  {
    workoutId: 1,
    name: 'Back & Biceps',
    date: new Date(),
    location: 'One XPS Fitness',
  },
]

export function getWorkoutsFromDate(day: number, month: number, year: number) {
  return MOCK_WORKOUT_DAY
}
