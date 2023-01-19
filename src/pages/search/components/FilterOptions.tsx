import { useState } from 'react'
import './FilterOptions.scss'

interface IFilterOptions {
  setShowFilters: (state: boolean) => void
}

export default function FilterOptions(props: IFilterOptions) {
  const { setShowFilters } = props
  const [typeFilters, setTypeFilters] = useState<string[]>([])

  function onChangeHandler(label: string) {
    if (typeFilters.includes(label)) {
      setTypeFilters((prevFilters) =>
        prevFilters.filter((val) => val !== label)
      )
    } else {
      setTypeFilters((prevFilters) => prevFilters.concat(label))
    }
  }

  return (
    <section className="absolute m-auto w-full max-w-sm rounded-lg border-2 border-solid border-brand-400 bg-brand-600">
      <div className="flex justify-between border-b-2 border-solid border-brand-500 p-4 pb-2">
        <button type="button" onClick={() => setShowFilters(false)}>
          x
        </button>
        <h2 className="text-2xl">Filters</h2>
        <div> </div>
      </div>
      <div className="p-4">
        <div className="mb-4">
          <h3 className="mb-2 text-xl">Sort by</h3>
          <div className="flex gap-4">
            <button
              type="button"
              className="rounded-full border-2 border-solid border-green p-2 text-sm"
            >
              Date (Newest first)
            </button>
            <button
              type="button"
              className="rounded-full border-2 border-solid border-brand-300 p-2 text-sm hover:border-green"
            >
              Date (Oldest first)
            </button>
          </div>
        </div>
        <div className="mb-4">
          <h3 className="mb-2 text-xl">Types</h3>
          <div className="flex gap-4">
            <button
              type="button"
              className="rounded-full border-2 border-solid border-green p-2 text-sm"
            >
              All
            </button>
            <button
              type="button"
              className="rounded-full border-2 border-solid border-brand-300 p-2 text-sm hover:border-green"
            >
              Exercise
            </button>
            <button
              type="button"
              className="rounded-full border-2 border-solid border-brand-300 p-2 text-sm hover:border-green"
            >
              Workout
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
