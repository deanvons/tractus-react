import type { Exercise } from '../types/exercise'
import ExerciseListItem from './ExerciseListItem'

interface Props {
  exercises: Exercise[]
}

function ExerciseList({ exercises }: Props) {
  return (
    <ul className="flex flex-col gap-4">
      {exercises.map((exercise) => (
        <ExerciseListItem key={exercise.id} exercise={exercise} />
      ))}
    </ul>
  )
}

export default ExerciseList
