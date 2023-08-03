import { useMemo, useRef, useState } from 'react'
import { searchByInput } from '../logic/search'

export function useMovies ({ query }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(null)
  // ? error no se usa (aún)
  const [error, setError] = useState(null)
  const previousQuery = useRef(query)

  const getMovies = useMemo(() => {
    return async ({ query }) => {
      if (query === previousQuery.current) return

      try {
        setLoading(true)
        setError(null)
        previousQuery.current = query
        const newMovies = await searchByInput({ query })
        setMovies(newMovies)
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
  }, [])

  return { error, getMovies, loading, movies }
}
