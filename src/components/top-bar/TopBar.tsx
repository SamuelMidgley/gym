import { useCallback, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import CalendarIcon from '../icons/CalendarIcon'
import CloseIcon from '../icons/CloseIcon'
import HomeIcon from '../icons/HomeIcon'
import LogIcon from '../icons/LogIcon'
import MenuIcon from '../icons/MenuIcon'
import WeightIcon from '../icons/WeightIcon'
import ProfilePic from '../profile-pic/ProfilePic'

import './TopBar.scss'

interface ITopBarMenu {
  clickHandler: () => void
}

function TopBarMenu(props: ITopBarMenu) {
  const location = useLocation()
  const onHomePage = location.pathname === '/gym/home'

  const { clickHandler } = props

  return (
    <div className={`top-bar-menu ${onHomePage ? 'top-bar-home' : ''}`}>
      <button type="button" onClick={clickHandler}>
        <CloseIcon />
      </button>

      <nav className="top-bar-nav">
        <Link to="gym/home" onClick={clickHandler}>
          <HomeIcon />
          Home
        </Link>
        <Link to="gym/exercise" onClick={clickHandler}>
          <WeightIcon />
          Exercises
        </Link>
        <Link to="gym/workout" onClick={clickHandler}>
          <LogIcon />
          Workouts
        </Link>
        <Link to="gym/calendar" onClick={clickHandler}>
          <CalendarIcon />
          Calendar
        </Link>
      </nav>
    </div>
  )
}

export default function TopBar() {
  const [showMenu, setShowMenu] = useState(false)

  const onClickHandler = useCallback(() => {
    setShowMenu((prevState) => !prevState)
  }, [])

  return (
    <div className="top-bar">
      <button type="button" onClick={onClickHandler}>
        <MenuIcon />
      </button>
      <h1>💪 Gym</h1>
      <ProfilePic />
      {showMenu && <TopBarMenu clickHandler={onClickHandler} />}
    </div>
  )
}
