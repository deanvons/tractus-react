import { Link } from 'react-router-dom'
import type { Exercise } from '../types/exercise'

/*
 * onClick and onSelect are gone. The component no longer calls back to a
 * parent — it navigates. Link renders an anchor tag but uses React Router's
 * history instead of a full page reload. The parent does not need to know
 * a click happened; the URL changes and React Router does the rest.
 */
interface Props {
  exercise: Exercise
}

function ExerciseListItem({ exercise }: Props) {
  return (
    <li className="border border-gray-200 rounded-lg transition-colors hover:border-blue-500 hover:bg-blue-50">
      <Link to={`/exercises/${exercise.id}`} className="block p-4">
        <h2 className="text-sm font-semibold">{exercise.name}</h2>
        <p className="text-xs text-gray-500 mt-0.5">{exercise.movementPattern}</p>
      </Link>
    </li>
  )
}

export default ExerciseListItem
