import { Routes, Route } from 'react-router-dom'
import ExerciseListPage from './pages/ExerciseListPage'
import ExerciseDetailPage from './pages/ExerciseDetailPage'

/*
 * App defines the route map. Each route points to a page component — no
 * layout, no logic, no JSX other than the route declarations themselves.
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<ExerciseListPage />} />
      <Route path="/exercises/:id" element={<ExerciseDetailPage />} />
    </Routes>
  )
}

export default App
