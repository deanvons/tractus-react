import { useState, useEffect } from 'react'
import type { Exercise } from '../types/exercise'
import ExerciseListItem from './ExerciseListItem'
import { getExercises } from '../services/exerciseService'

/*
 * selectedId and onSelect are now props — ExerciseList no longer owns the
 * selection. App holds the selected exercise so it can pass it to ExerciseDetail.
 * ExerciseList only knows which id is selected so it can highlight the right item.
 */
interface Props {
  selectedId: string | null
  onSelect: (exercise: Exercise | null) => void
}

function ExerciseList({ selectedId, onSelect }: Props) {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    getExercises()
      .then((data) => {
        setExercises(data)
        setIsLoading(false)
      })
      .catch((err: Error) => {
        setError(err.message)
        setIsLoading(false)
      })
  }, [retryCount])

  function handleRetry() {
    setIsLoading(true)
    setError(null)
    setRetryCount((c) => c + 1)
  }

  if (isLoading) {
    return (
      <ul className="flex flex-col gap-4">
        {[...Array(4)].map((_, i) => (
          <li key={i} className="border border-gray-200 rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-1/3 mb-2" />
            <div className="h-3 bg-gray-100 rounded w-1/4" />
          </li>
        ))}
      </ul>
    )
  }

  if (error) {
    return (
      <div>
        <p className="text-red-500 mb-3">Failed to load exercises: {error}</p>
        <button className="text-sm text-blue-600 underline" onClick={handleRetry}>
          Retry
        </button>
      </div>
    )
  }

  function handleSelect(exercise: Exercise) {
    onSelect(exercise.id === selectedId ? null : exercise)
  }

  return (
    <ul className="flex flex-col gap-4">
      {exercises.map((exercise) => (
        <ExerciseListItem
          key={exercise.id}
          exercise={exercise}
          isSelected={selectedId === exercise.id}
          onSelect={handleSelect}
        />
      ))}
    </ul>
  )
}

export default ExerciseList
