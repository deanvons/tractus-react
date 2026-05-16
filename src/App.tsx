import { Routes, Route } from 'react-router-dom'
import ExerciseListPage from './pages/ExerciseListPage'
import ExerciseDetailPage from './pages/ExerciseDetailPage'
import NotFoundPage from './pages/NotFoundPage'

/*
 * App defines the route map. Each route points to a page component — no
 * layout, no logic, no JSX other than the route declarations themselves.
 * The path="*" catch-all matches any URL that no other route claimed.
 */
function App() {
  return (
    <Routes>
      <Route path="/" element={<ExerciseListPage />} />
      <Route path="/exercises/:id" element={<ExerciseDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}

export default App
