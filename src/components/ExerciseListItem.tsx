import type { Exercise } from '../types/exercise'

interface Props {
  exercise: Exercise
}

// The data is now passed in from the parent — compare this to the phase-01
// version where it was hardcoded inside the function body. The JSX structure
// is identical; only the values changed from literals to prop expressions.
function ExerciseListItem({ exercise }: Props) {
  return (
    <li className="border border-gray-200 rounded-lg p-4">
      <h2 className="text-lg font-semibold mb-2">{exercise.name}</h2>
      <ul className="text-sm text-gray-600 flex flex-col gap-1">
        <li><span className="font-medium">Category:</span> {exercise.category}</li>
        <li><span className="font-medium">Movement pattern:</span> {exercise.movementPattern}</li>
        <li><span className="font-medium">Primary muscle:</span> {exercise.primaryMuscle}</li>
        <li><span className="font-medium">Laterality:</span> {exercise.laterality}</li>
        <li><span className="font-medium">SI risk:</span> {exercise.siRisk}</li>
      </ul>
    </li>
  )
}

export default ExerciseListItem
