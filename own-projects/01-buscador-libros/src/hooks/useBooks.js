import { useCallback, useRef, useState } from 'react'
import searchByInput from '../logic/search'
// import results from '../mocks/results.json'

export default function useBooks ({ query }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)
  const previousQuery = useRef(query)

  const getBooks = useCallback(async ({ query, sort }) => {
    if (query === previousQuery) return

    try {
      setLoading(true)
      setError(null)
      previousQuery.current = query
      const newBooks = await searchByInput({ query, sort })
      setBooks(newBooks)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  return { books, error, getBooks, loading }
}
