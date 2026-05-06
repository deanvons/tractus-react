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
      <h2 className="text-sm font-semibold">{exercise.name}</h2>
      <p className="text-xs text-gray-500 mt-0.5">{exercise.movementPattern}</p>
    </li>
  )
}

export default ExerciseListItem
