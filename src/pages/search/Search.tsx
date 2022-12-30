import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import FilterIcon from '../../components/icons/FilterIcon'
import SearchIcon from '../../components/icons/SearchIcon'
import getSearchResults, { ISearchResult } from './api'
import FilterOptions from './components/FilterOptions'
import SearchBar from './components/SearchBar'
import SearchCard from './components/SearchCard'

import './Search.scss'

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
      <header className="search-header">
        <h1>Search</h1>
        <div className="search-bar-area">
          <div className="search-bar-search">
            <SearchIcon />
            <SearchBar initialSearchTerm={searchTermFromNavigate} />
          </div>
          <div className="filter-icon">
            <button
              type="button"
              onClick={() => setShowFilters((prevFilters) => !prevFilters)}
            >
              <FilterIcon />
            </button>
          </div>
        </div>
      </header>
      <main className="search-main">
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
