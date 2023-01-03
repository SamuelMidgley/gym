export interface IOptionResults {
  id: number
  name: string
}

const MOCK_WORKOUT_RESULTS: IOptionResults[] = [
  {
    id: 12,
    name: 'Back & Biceps',
  },
  {
    id: 23,
    name: 'Chest & Triceps',
  },
  {
    id: 22,
    name: 'Legs',
  },
]

export default function getAllOptions(type: 'workout' | 'exercise') {
  return MOCK_WORKOUT_RESULTS
}
