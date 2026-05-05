import type { Exercise } from '../types/exercise'

interface Props {
  exercise: Exercise
}

// The data is now passed in from the parent — compare this to the phase-01
// version where it was hardcoded inside the function body. The JSX structure
// is identical; only the values changed from literals to prop expressions.
function ExerciseListItem({ exercise }: Props) {
  return (
    <div>
      <h2>{exercise.name}</h2>
      <ul>
        <li><strong>Category:</strong> {exercise.category}</li>
        <li><strong>Movement pattern:</strong> {exercise.movementPattern}</li>
        <li><strong>Primary muscle:</strong> {exercise.primaryMuscle}</li>
        <li><strong>Laterality:</strong> {exercise.laterality}</li>
        <li><strong>SI risk:</strong> {exercise.siRisk}</li>
      </ul>
    </div>
  )
}

export default ExerciseListItem
