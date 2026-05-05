import type { Exercise } from '../types/exercise'

/*
 * Props is the TypeScript interface that defines what this component expects
 * from its parent. The parent must pass an object matching the Exercise type —
 * the compiler will catch a missing or mistyped field before the code runs.
 */
interface Props {
  exercise: Exercise
}

/*
 * The { exercise } syntax is destructuring — we pull the exercise prop out of
 * the Props object directly in the function signature rather than writing
 * props.exercise throughout. The JSX below is structurally identical to the
 * phase-01 version; only the hardcoded values are replaced by expressions.
 */
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
