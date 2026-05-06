import type { Exercise } from '../types/exercise'

/*
 * Two new props alongside exercise:
 * - isSelected: the parent tells this item whether it is the active one
 * - onSelect: a callback the parent passes down — the child calls it when
 *   clicked, the parent decides what to do with the id. The child has no
 *   opinion about what "selected" means globally; it only reports the event.
 */
interface Props {
  exercise: Exercise
  isSelected: boolean
  onSelect: (id: string) => void
}

function ExerciseListItem({ exercise, isSelected, onSelect }: Props) {
  return (
    <li
      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
      }`}
      onClick={() => onSelect(exercise.id)}
    >
      <h2 className="text-sm font-semibold">{exercise.name}</h2>
      <p className="text-xs text-gray-500 mt-0.5">{exercise.movementPattern}</p>
    </li>
  )
}

export default ExerciseListItem
