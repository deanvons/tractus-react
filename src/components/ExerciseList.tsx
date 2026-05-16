import { useState } from 'react'
import type { Exercise } from '../types/exercise'
import ExerciseListItem from './ExerciseListItem'
import ExerciseFilter from './ExerciseFilter'
import { getExercises } from '../services/exerciseService'
import useFetch from '../hooks/useFetch'

/*
 * The fetch wiring — useState for data/isLoading/error, the useEffect, the
 * retry mechanism — is gone. useFetch handles all of it. What remains is what
 * belongs here: the filter state that is specific to this component, and the
 * derived computations that depend on both the data and the filter values.
 */
function ExerciseList() {
  const { data: exercises, isLoading, error } = useFetch<Exercise[]>(getExercises)
  const [filterText, setFilterText] = useState('')
  const [filterCategory, setFilterCategory] = useState('')

  function handleClear() {
    setFilterText('')
    setFilterCategory('')
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
    return <p className="text-red-500">Failed to load exercises: {error}</p>
  }

  const list = exercises ?? []
  const categories = [...new Set(list.map((ex) => ex.category))].sort()
  const filteredExercises = list.filter((ex) => {
    const matchesText = ex.name.toLowerCase().includes(filterText.toLowerCase())
    const matchesCategory = filterCategory === '' || ex.category === filterCategory
    return matchesText && matchesCategory
  })

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
        Showing {filteredExercises.length} of {list.length} exercises
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
