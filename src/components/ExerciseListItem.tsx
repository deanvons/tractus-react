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

const siRiskClass: Record<string, string> = {
  low: 'bg-green-100 text-green-700',
  medium: 'bg-yellow-100 text-yellow-700',
  high: 'bg-red-100 text-red-700',
}

function ExerciseListItem({ exercise, isSelected, onSelect }: Props) {
  return (
    <li
      className={`border rounded-lg p-4 cursor-pointer transition-colors ${
        isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
      }`}
      onClick={() => onSelect(exercise.id)}
    >
      <h2 className="text-lg font-semibold mb-2">{exercise.name}</h2>
      <ul className="text-sm text-gray-600 flex flex-col gap-1">
        <li><span className="font-medium">Category:</span> {exercise.category}</li>
        <li><span className="font-medium">Movement pattern:</span> {exercise.movementPattern}</li>
        <li><span className="font-medium">Primary muscle:</span> {exercise.primaryMuscle}</li>
        <li><span className="font-medium">Laterality:</span> {exercise.laterality}</li>
        <li>
          <span className="font-medium">SI risk:</span>{' '}
          <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${siRiskClass[exercise.siRisk] ?? 'bg-gray-100 text-gray-600'}`}>
            {exercise.siRisk}
          </span>
        </li>
      </ul>
    </li>
  )
}

export default ExerciseListItem
