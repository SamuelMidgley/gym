import { format } from 'date-fns'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import CalendarIcon from '../../components/icons/CalendarIcon'
import LogIcon from '../../components/icons/LogIcon'
import SearchIcon from '../../components/icons/SearchIcon'
import WeightIcon from '../../components/icons/WeightIcon'
import SearchBar from '../search/components/SearchBar'
import getWorkout, { IWorkout } from '../workout/api'

import './Home.scss'

const workout3 = getWorkout(3)

interface IQuickLink {
  name: string
  desc: string
  link: string
  Icon: ReactNode
}

function QuickLink(props: IQuickLink) {
  const { name, desc, link, Icon } = props

  return (
    <div className="quick-link">
      {Icon}
      <h3 className="text-lg">{name}</h3>
      <p>{desc}</p>
      <Link to={`/gym/${link}`}>Click here</Link>
    </div>
  )
}

function HomeHeader() {
  return (
    <header className="home-header">
      <div className="curvy-goodness">
        <svg
          id="visual"
          viewBox="0 0 450 900"
          width="450"
          height="900"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          preserveAspectRatio="none"
        >
          <path
            d="M0 276L37.5 282.2C75 288.3 150 300.7 225 299.8C300 299 375 285 412.5 278L450 271L450 0L412.5 0C375 0 300 0 225 0C150 0 75 0 37.5 0L0 0Z"
            fill="#393945"
            strokeLinecap="round"
            strokeLinejoin="miter"
          />
        </svg>
      </div>
      <div className="home-search-bar">
        <SearchIcon />
        <SearchBar />
      </div>
      <Link className="home-add" to="/gym/workout/add">
        Add Workout
      </Link>
    </header>
  )
}

function HomeLinks() {
  return (
    <article className="home-article">
      <h2 className="text-2xl">Quick Links</h2>
      <ul>
        <li>
          <QuickLink
            name="Exercises"
            desc="A complete log of all exercises completed"
            link="exercise"
            Icon={<WeightIcon />}
          />
        </li>
        <li>
          <QuickLink
            name="Workouts"
            desc="A complete history of all your workouts"
            link="workout"
            Icon={<LogIcon />}
          />
        </li>
        <li>
          <QuickLink
            name="Calendar"
            desc="A calender view of all your workouts"
            link="calendar"
            Icon={<CalendarIcon />}
          />
        </li>
      </ul>
    </article>
  )
}

interface ITodayCard {
  workout: IWorkout
}

function TodayCard(props: ITodayCard) {
  const { workout } = props
  const { id, name, location, date } = workout

  return (
    <div className="home-today">
      <div className="today-time">{format(date, 'HH:mm')}</div>
      <div className="today-icon">
        <WeightIcon />
      </div>
      <Link to={`/gym/workout/${id}`}>
        <div className="today-text">
          <h3 className="today-name">{name}</h3>
          <div className="today-location">{location}</div>
        </div>
      </Link>
    </div>
  )
}

function HomeToday() {
  return (
    <article className="home-article">
      <h2 className="text-2xl">What&apos;s on today</h2>
      <ul>
        <li>
          <TodayCard workout={workout3} />
        </li>
      </ul>
    </article>
  )
}

export default function Home() {
  return (
    <div className="home">
      <HomeHeader />
      <main className="home-main">
        <HomeToday />
        <HomeLinks />
      </main>
    </div>
  )
}
