import { useNavigate } from 'react-router-dom'

function NotFoundPage() {
  const navigate = useNavigate()

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">Page not found</h1>
      <p className="text-gray-500 mb-6">There is nothing at this URL.</p>
      <button className="text-sm text-blue-600 underline" onClick={() => navigate('/')}>
        Back to exercises
      </button>
    </main>
  )
}

export default NotFoundPage
