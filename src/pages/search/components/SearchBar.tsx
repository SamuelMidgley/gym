import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface ISearchBar {
  initialSearchTerm?: string
}

export default function SearchBar(props: ISearchBar) {
  const { initialSearchTerm } = props
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm ?? '')
  const navigate = useNavigate()

  return (
    <input
      className="search-bar"
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm((e.target as HTMLInputElement).value)}
      onKeyDown={(e) => {
        if (e.key === 'Enter') {
          navigate('/gym/search', { state: { searchTerm } })
        }
      }}
    />
  )
}
