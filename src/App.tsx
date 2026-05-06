import { Routes, Route } from 'react-router-dom'
import ExerciseList from './components/ExerciseList'
import ExerciseDetailPage from './pages/ExerciseDetailPage'

/*
 * selectedExercise state is gone. App no longer coordinates between two
 * sibling components — it defines a route map. The URL is the state now:
 * '/' renders the list, '/exercises/:id' renders the detail page.
 * Each route is an independent subtree with its own data fetching.
 */
function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <main className="max-w-4xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Tractus</h1>
            <ExerciseList />
          </main>
        }
      />
      <Route path="/exercises/:id" element={<ExerciseDetailPage />} />
    </Routes>
  )
}

export default App
