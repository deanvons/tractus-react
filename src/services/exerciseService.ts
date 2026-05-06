import type { Exercise } from '../types/exercise'

/*
 * A service module owns the details of how data is fetched — the URL, the
 * response shape, the error handling. The component imports the function and
 * calls it; it does not need to know anything about fetch, the base URL, or
 * the API contract. If the endpoint changes, this is the only file to update.
 *
 * There is no React in this file. It is a plain async function that could run
 * in any JavaScript environment. That separation is deliberate — data fetching
 * is not a React concern, it is an application concern.
 */
export async function getExercises(): Promise<Exercise[]> {
  const response = await fetch('http://localhost:8080/exercises')

  if (!response.ok) {
    throw new Error(`Server error: ${response.status}`)
  }

  return response.json()
}
