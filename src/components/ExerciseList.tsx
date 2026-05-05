import type { Exercise } from '../types/exercise'
import ExerciseListItem from './ExerciseListItem'

interface Props {
  exercises: Exercise[]
}

function ExerciseList({ exercises }: Props) {
  return (
    <ul>
      {exercises.map((exercise) => (
        <ExerciseListItem key={exercise.id} exercise={exercise} />
      ))}
    </ul>
  )
}

export default ExerciseList
