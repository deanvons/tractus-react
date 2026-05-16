import { useParams } from 'react-router-dom'
import ExerciseDetail from '../components/ExerciseDetail'

/*
 * The page's only job is to read the URL and pass the id to the component
 * that knows what to do with it. No fetch, no state, no rendering logic here.
 */
function ExerciseDetailPage() {
  const { id } = useParams<{ id: string }>()

  if (!id) return null

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <ExerciseDetail id={id} />
    </main>
  )
}

export default ExerciseDetailPage
