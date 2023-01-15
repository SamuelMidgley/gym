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
      <header className="flex flex-col items-center w-full my-6">
        <h1 className="text-3xl text-center mb-2">Search</h1>
        <div className="inline-flex gap-4 w-4/5 max-w-lg">
          <div className="inline-flex w-full gap-4 py-2 px-5 bg-brand-600 rounded-3xl items-center">
            <SearchIcon />
            <SearchBar initialSearchTerm={searchTermFromNavigate} />
          </div>
          <div className="flex items-center">
            <button
              type="button"
              className="h-11 w-11 p-1 rounded-3xl flex justify-center items-center bg-green"
              onClick={() => setShowFilters((prevFilters) => !prevFilters)}
            >
              <FilterIcon />
            </button>
          </div>
        </div>
      </header>
      <main className="flex sm:col gap-4">
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
