import { useCallback, useEffect, useState } from 'react'
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
    <div
      className={`top-bar-menu bg-brand-600 ${
        onHomePage ? 'top-bar-home' : ''
      }`}
    >
      <button type="button" onClick={clickHandler}>
        <CloseIcon />
      </button>

      <nav className="top-bar-nav">
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

interface INavBar {
  onClickHandler: () => void
  optionalClassName?: string
}

function NavBar(props: INavBar) {
  const { onClickHandler, optionalClassName } = props

  return (
    <nav className={optionalClassName ? 'top-bar-nav-hor' : 'top-bar-nav'}>
      <Link to="gym/exercise" onClick={onClickHandler}>
        <WeightIcon />
        Exercises
      </Link>
      <Link to="gym/workout" onClick={onClickHandler}>
        <LogIcon />
        Workouts
      </Link>
      <Link to="gym/calendar" onClick={onClickHandler}>
        <CalendarIcon />
        Calendar
      </Link>
    </nav>
  )
}

export default function TopBar() {
  const [showMenu, setShowMenu] = useState(false)
  const [reducedMenu, setReducedMenu] = useState<boolean>(false)

  const onClickHandler = useCallback(() => {
    setShowMenu((prevState) => !prevState)
  }, [])

  function resizeHandler() {
    console.log(window.innerWidth < 750)
    setReducedMenu(window.innerWidth < 750)
  }

  useEffect(() => {
    window.addEventListener('resize', resizeHandler)

    return () => window.removeEventListener('resize', resizeHandler)
  }, [])

  return (
    <div className="top-bar">
      {reducedMenu && (
        <div>
          <button type="button" onClick={onClickHandler}>
            <MenuIcon />
          </button>
          {showMenu && <TopBarMenu clickHandler={onClickHandler} />}
        </div>
      )}
      <Link to="/gym/home">
        <h1 className="text-3xl font-bold">💪 Gym</h1>
      </Link>
      {!reducedMenu && (
        <NavBar
          onClickHandler={onClickHandler}
          optionalClassName="nav-horizontal"
        />
      )}
      <ProfilePic />
    </div>
  )
}
