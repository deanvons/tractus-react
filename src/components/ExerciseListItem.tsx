import { NavLink } from 'react-router-dom'
import type { Exercise } from '../types/exercise'

/*
 * NavLink works like Link but receives an isActive boolean in its className
 * function, set to true when the current URL matches the `to` prop. In this
 * architecture the list and detail are separate routes, so navigating to an
 * exercise replaces the list entirely — the active style is never visible
 * while viewing the detail. The value of NavLink shows more clearly in layouts
 * where a sidebar or nav persists alongside the content (introduced in later
 * phases). It is implemented here so the API is visible before that context.
 */
interface Props {
  exercise: Exercise
}

function ExerciseListItem({ exercise }: Props) {
  return (
    <li className="border rounded-lg transition-colors">
      <NavLink
        to={`/exercises/${exercise.id}`}
        className={({ isActive }) =>
          `block p-4 rounded-lg ${isActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-500 hover:bg-blue-50'}`
        }
      >
        <h2 className="text-sm font-semibold">{exercise.name}</h2>
        <p className="text-xs text-gray-500 mt-0.5">{exercise.movementPattern}</p>
      </NavLink>
    </li>
  )
}

export default ExerciseListItem
