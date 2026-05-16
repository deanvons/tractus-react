import { useNavigate } from 'react-router-dom'
import type { Exercise } from '../types/exercise'
import { getExercise } from '../services/exerciseService'
import useFetch from '../hooks/useFetch'

/*
 * ExerciseDetail receives an id prop — the page reads the URL, this component
 * handles what to do with it. The fetch wiring that was here before is now
 * one useFetch call. The deps array [id] tells the hook to re-fetch whenever
 * the id changes — the same contract as useEffect's dependency array.
 */
interface Props {
  id: string
}

function ExerciseDetail({ id }: Props) {
  const navigate = useNavigate()
  const { data: exercise, isLoading, error } = useFetch<Exercise>(
    () => getExercise(id),
    [id]
  )

  if (isLoading) {
    return (
      <>
        <div className="h-8 bg-gray-200 rounded w-1/3 mb-6 animate-pulse" />
        <div className="border border-gray-200 rounded-lg p-6 animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-3" />
          <div className="h-8 bg-gray-200 rounded w-1/2 mb-2" />
          <div className="h-4 bg-gray-100 rounded w-1/3" />
        </div>
      </>
    )
  }

  if (error) {
    return (
      <>
        <p className="text-red-500 mb-3">Failed to load exercise: {error}</p>
        <button className="text-sm text-blue-600 underline" onClick={() => navigate('/')}>
          Back to list
        </button>
      </>
    )
  }

  if (!exercise) return null

  return (
    <>
      <button
        className="text-sm text-blue-600 underline mb-6 block"
        onClick={() => navigate('/')}
      >
        ← Back to exercises
      </button>
      <div className="border-2 border-gray-900 rounded-lg p-6 bg-gray-50">
        <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">Exercise</p>
        <h1 className="text-3xl font-bold mb-1">{exercise.name}</h1>
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
    </>
  )
}

export default ExerciseDetail
