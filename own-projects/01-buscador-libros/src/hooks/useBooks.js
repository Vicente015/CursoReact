import { useCallback, useRef, useState } from 'react'
import searchByInput from '../logic/search'

export default function useBooks ({ query }) {
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(null)
  const [error, setError] = useState(null)
  const previousQuery = useRef(query)

  const getBooks = useCallback(async ({ query }) => {
    if (query === previousQuery) return

    try {
      setLoading(true)
      setError(null)
      previousQuery.current = query
      const newBooks = await searchByInput({ query })
      // ? Adds a default field with true
      const reMapBooks = newBooks.map((book) => ({ ...book, show: true }))
      setBooks(reMapBooks)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  return { books, error, getBooks, loading, setBooks }
}
