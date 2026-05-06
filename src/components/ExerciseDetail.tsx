import type { Exercise } from '../types/exercise'

interface Props {
  exercise: Exercise | null
}

/*
 * ExerciseDetail now receives its data as a prop rather than hardcoding it.
 * The parent (App) decides which exercise to show — ExerciseDetail only
 * decides how to show it. When nothing is selected, a placeholder is shown.
 * This is the same container/presentational split as ExerciseList/ExerciseListItem,
 * one level higher: App is the container, ExerciseDetail is presentational.
 */
function ExerciseDetail({ exercise }: Props) {
  if (!exercise) {
    return (
      <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center text-gray-400 text-sm">
        Select an exercise to see details
      </div>
    )
  }

  return (
    <div className="border-2 border-gray-900 rounded-lg p-6 bg-gray-50">
      <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Selected exercise</p>
      <h2 className="text-2xl font-bold mb-1">{exercise.name}</h2>
      <p className="text-gray-500 text-sm mb-6">{exercise.movementPattern} · {exercise.category}</p>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-4 text-sm">
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">Primary muscle</dt>
          <dd className="mt-0.5 font-medium">{exercise.primaryMuscle}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">Laterality</dt>
          <dd className="mt-0.5 font-medium capitalize">{exercise.laterality}</dd>
        </div>
        <div>
          <dt className="text-xs font-semibold uppercase tracking-wide text-gray-400">SI risk</dt>
          <dd className="mt-0.5">
            <span className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
              exercise.siRisk === 'low' ? 'bg-green-100 text-green-700' :
              exercise.siRisk === 'medium' ? 'bg-yellow-100 text-yellow-700' :
              'bg-red-100 text-red-700'
            }`}>
              {exercise.siRisk}
            </span>
          </dd>
        </div>
      </dl>
    </div>
  )
}

export default ExerciseDetail
