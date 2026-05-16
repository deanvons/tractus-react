import { useState, useEffect } from 'react'

/*
 * A custom hook that extracts the fetch/loading/error pattern repeated across
 * every component that loads data. The caller passes a fetch function and a
 * deps array — the effect re-runs whenever deps change, just like useEffect.
 *
 * The fetch function is intentionally excluded from the effect's dependency
 * array. Including it would cause infinite re-fetching, because an inline
 * arrow function (e.g. () => getExercise(id)) is a new reference on every
 * render. The deps array is the caller's way of saying "re-run when these
 * values change" — the same contract as useEffect's second argument.
 * The eslint-disable comment is deliberate: we understand the trade-off.
 *
 * State lives in React's fiber tree — not inside this function. useFetch
 * calls useState and useEffect, which read from and write to the slots React
 * maintains for the component instance that called this hook. The hook is
 * just the function that wires those slots together.
 */
function useFetch<T>(fetchFn: () => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setIsLoading(true)
    setError(null)

    fetchFn()
      .then((result) => {
        setData(result)
        setIsLoading(false)
      })
      .catch((err: Error) => {
        setError(err.message)
        setIsLoading(false)
      })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return { data, isLoading, error }
}

export default useFetch
