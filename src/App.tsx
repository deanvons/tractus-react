import { useState } from 'react'
import type { Exercise } from './types/exercise'
import ExerciseList from './components/ExerciseList'
import ExerciseDetail from './components/ExerciseDetail'

/*
 * selectedExercise lives in App — not in ExerciseList — because two sibling
 * components need it: ExerciseList (to highlight the selected item) and
 * ExerciseDetail (to show the full data). State that two siblings share must
 * live in their common ancestor. That ancestor is App.
 */
function App() {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null)

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Tractus</h1>
      <div className="flex gap-6">
        <div className="flex-1">
          <ExerciseList
            selectedId={selectedExercise?.id ?? null}
            onSelect={setSelectedExercise}
          />
        </div>
        <div className="w-72">
          <ExerciseDetail exercise={selectedExercise} />
        </div>
      </div>
    </main>
  )
}

export default App
