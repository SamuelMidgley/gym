import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Calendar from './pages/calendar/Calendar'
import Home from './pages/home/Home'
import NotFound from './pages/not-found/NotFound'
import WorkoutList from './pages/workout-list/WorkoutList'
import Workout from './pages/workout/Workout'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/gym/home" />} />
      <Route path="/gym" element={<Navigate to="/gym/home" />} />
      <Route path="/gym/home" element={<Home />} />
      <Route path="/gym/workout" element={<WorkoutList />} />
      <Route path="/gym/workout/add" element={<Home />} />
      <Route path="/gym/workout/id" element={<Workout />} />
      <Route path="/gym/calendar" element={<Calendar />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export function WrappedApp() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  )
}
