import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Calendar from './pages/calendar/Calendar'
import ExerciseHome from './pages/exercise/home/ExerciseHome'
import Exercise from './pages/exercise/id/Exercise'
import Home from './pages/home/Home'
import NotFound from './pages/not-found/NotFound'
import WorkoutHome from './pages/workout/home/WorkoutHome'
import Workout from './pages/workout/id/Workout'

import './App.scss'
import TopBar from './components/top-bar/TopBar'
import Search from './pages/search/Search'
import AddWorkout from './pages/workout/add/AddWorkout'

export function App() {
  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<Navigate to="/gym/home" />} />
        <Route path="/gym" element={<Navigate to="/gym/home" />} />
        <Route path="/gym/home" element={<Home />} />
        <Route path="/gym/workout" element={<WorkoutHome />} />
        <Route path="/gym/workout/add" element={<AddWorkout />} />
        <Route path="/gym/workout/:workoutId" element={<Workout />} />
        <Route path="/gym/exercise" element={<ExerciseHome />} />
        {/* <Route path="/gym/exercise/add" element={<Home />} /> */}
        <Route path="/gym/exercise/:exerciseId" element={<Exercise />} />
        <Route path="/gym/calendar" element={<Calendar />} />
        <Route path="/gym/search" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

export function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}
