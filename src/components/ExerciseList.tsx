import type { Exercise } from '../types/exercise'
import ExerciseListItem from './ExerciseListItem'

// The hardcoded data lives here rather than in App — ExerciseList is the
// feature component responsible for exercises, so it owns its data.
// In phase 04 this array is replaced by a fetch call to GET /exercises.
// ExerciseListItem will not need to change at all.
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

function ExerciseList() {
  return (
    // Each ExerciseListItem receives one exercise as a prop via .map().
    // The key prop is required on every item in a list — React uses it to
    // track which item is which across re-renders. Without it, React has to
    // re-render the entire list on every change instead of only what changed.
    // We use the exercise id because it is stable and unique.
    <ul className="flex flex-col gap-4">
      {exercises.map((exercise) => (
        <ExerciseListItem key={exercise.id} exercise={exercise} />
      ))}
    </ul>
  )
}

export default ExerciseList
