export interface ISearchResult {
  type: string
  id: number
  name: string
  lastUpdated: Date
}

const MOCK_SEARCH_RESULTS: ISearchResult[] = [
  {
    type: 'exercise',
    id: 10,
    name: 'Bench Press',
    lastUpdated: new Date(),
  },
  {
    type: 'workout',
    id: 4,
    name: 'Chest & Triceps',
    lastUpdated: new Date(),
  },
]

export default function getSearchResults(searchTerm: string): ISearchResult[] {
  const results = MOCK_SEARCH_RESULTS
  return results
}
