import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import FilterIcon from '../../components/icons/FilterIcon'
import SearchIcon from '../../components/icons/SearchIcon'
import getSearchResults, { ISearchResult } from './api'
import FilterOptions from './components/FilterOptions'
import SearchBar from './components/SearchBar'
import SearchCard from './components/SearchCard'

interface ILocation {
  searchTerm: string
}

export default function Search() {
  const location = useLocation()
  const locationState = location.state as ILocation

  const searchTermFromNavigate = locationState?.searchTerm ?? ''

  const [searchTerm, setSearchTerm] = useState<string>(searchTermFromNavigate)

  const [searchResults, setSearchResults] = useState<ISearchResult[]>(
    getSearchResults(searchTerm)
  )

  const [showFilters, setShowFilters] = useState<boolean>(false)

  useEffect(() => {
    setSearchResults(getSearchResults(searchTerm))
  }, [searchTerm])

  return (
    <>
      <header className="my-6 flex w-full flex-col items-center">
        <h1 className="mb-2 text-center text-3xl">Search</h1>
        <div className="inline-flex w-4/5 max-w-lg gap-4">
          <div className="inline-flex w-full items-center gap-4 rounded-3xl bg-brand-600 py-2 px-5">
            <SearchIcon />
            <SearchBar initialSearchTerm={searchTermFromNavigate} />
          </div>
          <div className="flex items-center">
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-3xl bg-green p-1"
              onClick={() => setShowFilters((prevFilters) => !prevFilters)}
            >
              <FilterIcon />
            </button>
          </div>
        </div>
      </header>
      <main className="sm:col flex gap-5">
        <FilterOptions />
        {showFilters && <FilterOptions />}
        <section>
          {searchResults.map((result) => (
            <SearchCard key={`${result.type}_${result.id}`} data={result} />
          ))}
        </section>
      </main>
    </>
  )
}
