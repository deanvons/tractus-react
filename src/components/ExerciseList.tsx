import { useState, useEffect } from 'react'
import type { Exercise } from '../types/exercise'
import ExerciseListItem from './ExerciseListItem'
import ExerciseFilter from './ExerciseFilter'
import { getExercises } from '../services/exerciseService'

/*
 * ExerciseList owns both the fetched data and the filter state — they live
 * together because both are needed to compute what gets rendered. The filtered
 * list is not stored in state: it is derived fresh on every render from the
 * full exercises array and the current filter values. Storing it separately
 * would mean keeping two pieces of state in sync, which is a source of bugs.
 *
 * categories is also derived — unique values extracted from the fetched data
 * so the dropdown always reflects what the API actually returns.
 */
function ExerciseList() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [filterText, setFilterText] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

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

  const categories = [...new Set(exercises.map((ex) => ex.category))].sort()

  const filteredExercises = exercises.filter((ex) => {
    const matchesText = ex.name.toLowerCase().includes(filterText.toLowerCase())
    const matchesCategory = filterCategory === '' || ex.category === filterCategory
    return matchesText && matchesCategory
  })

  function handleClear() {
    setFilterText('')
    setFilterCategory('')
  }

  return (
    <>
      <ExerciseFilter
        filterText={filterText}
        filterCategory={filterCategory}
        categories={categories}
        onTextChange={setFilterText}
        onCategoryChange={setFilterCategory}
        onClear={handleClear}
      />
      <p className="text-xs text-gray-400 mb-4">
        Showing {filteredExercises.length} of {exercises.length} exercises
      </p>
      <ul className="flex flex-col gap-4">
        {filteredExercises.map((exercise) => (
          <ExerciseListItem key={exercise.id} exercise={exercise} />
        ))}
      </ul>
    </>
  )
}

export default ExerciseList
