import type { Exercise } from './types/exercise'
import ExerciseList from './components/ExerciseList'

// In phase 04 this hardcoded array is replaced by a fetch call to GET /exercises.
// ExerciseList and ExerciseListItem will not need to change — only this file.
const exercises: Exercise[] = [
  {
    id: '1',
    name: 'Back Squat',
    category: 'Strength',
    movementPattern: 'Squat',
    primaryMuscle: 'Quadriceps',
    laterality: 'bilateral',
    siRisk: 'medium',
  },
  {
    id: '2',
    name: 'Romanian Deadlift',
    category: 'Strength',
    movementPattern: 'Hinge',
    primaryMuscle: 'Hamstrings',
    laterality: 'bilateral',
    siRisk: 'medium',
  },
  {
    id: '3',
    name: 'Pull-up',
    category: 'Strength',
    movementPattern: 'Pull',
    primaryMuscle: 'Latissimus Dorsi',
    laterality: 'bilateral',
    siRisk: 'low',
  },
  {
    id: '4',
    name: 'Single-leg Romanian Deadlift',
    category: 'Strength',
    movementPattern: 'Hinge',
    primaryMuscle: 'Hamstrings',
    laterality: 'unilateral',
    siRisk: 'high',
  },
]

function App() {
  return (
    <main>
      <h1>Tractus</h1>
      <ExerciseList exercises={exercises} />
    </main>
  )
}

export default App
