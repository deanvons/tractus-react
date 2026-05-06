import ExerciseList from './components/ExerciseList'
import ExerciseDetail from './components/ExerciseDetail'

// App is responsible for page layout only — it does not own domain data.
// Each feature component manages its own data internally.
function App() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tractus</h1>
      <div className="flex gap-6">
        <div className="flex-1">
          <ExerciseList />
        </div>
        <div className="w-72">
          <ExerciseDetail />
        </div>
      </div>
    </main>
  )
}

export default App
