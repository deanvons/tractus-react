import { useState, useEffect } from 'react'
import type { Exercise } from '../types/exercise'
import ExerciseListItem from './ExerciseListItem'
import { getExercises } from '../services/exerciseService'

function ExerciseList() {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  /*
   * selectedId is null when nothing is selected and holds the exercise id
   * when one is active. It lives here — not in ExerciseListItem — because
   * only one item can be selected at a time, and enforcing that requires a
   * single piece of state that can see all items at once.
   */
  const [selectedId, setSelectedId] = useState<string | null>(null)

  /*
   * useEffect runs after the component renders. The empty array [] is the
   * dependency array — it tells React to run this effect once, after the
   * first render (mount), and never again. Without it, the effect would run
   * after every render, causing an infinite loop of fetches and re-renders.
   *
   * fetch() is a browser API — it lives outside React. useEffect is the
   * designated place for code that reaches outside the component like this.
   * Calling fetch directly in the component body would run on every render
   * and cannot be controlled the same way.
   *
   * In phase 07 this fetch call moves into a service module — the component
   * will not know or care how the data is fetched, only that it arrives.
   */
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
  }, [])

  if (isLoading) {
    return <p className="text-gray-500">Loading exercises...</p>
  }

  if (error) {
    return <p className="text-red-500">Failed to load exercises: {error}</p>
  }

  function handleSelect(id: string) {
    setSelectedId((current) => (current === id ? null : id))
  }

  const selectedExercise = exercises.find((e) => e.id === selectedId) ?? null

  return (
    <>
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
      {selectedExercise && (
        <div className="mt-6 p-4 border border-blue-200 rounded-lg bg-blue-50">
          <h2 className="text-lg font-semibold mb-1">{selectedExercise.name}</h2>
          <p className="text-sm text-gray-600">{selectedExercise.category}</p>
        </div>
      )}
    </>
  )
}

export default ExerciseList
