import { Link } from 'react-router-dom'
import LogIcon from '../../../components/icons/LogIcon'
import SearchIcon from '../../../components/icons/SearchIcon'
import WeightIcon from '../../../components/icons/WeightIcon'
import { ISearchResult } from '../api'
import './SearchCard.scss'

interface ISearchCard {
  data: ISearchResult
}

function renderIcon(type: string) {
  switch (type) {
    case 'exercise':
      return <WeightIcon />
    case 'workout':
      return <LogIcon />
    default:
      return <SearchIcon />
  }
}

export default function SearchCard(props: ISearchCard) {
  const { data } = props
  const { type, id, name, lastUpdated } = data

  return (
    <Link to={`/gym/${type}/${id}`}>
      <div className="search-card">
        <div className="search-icon">{renderIcon(type)}</div>
        <div>
          <h2 className="search-name text-2xl">{name}</h2>
          <span>Last Updated: {lastUpdated.toLocaleDateString()}</span>
        </div>
        <div className="search-type">
          <p>{type}</p>
        </div>
      </div>
    </Link>
  )
}
