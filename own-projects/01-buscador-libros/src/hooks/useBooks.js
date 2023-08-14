import { useCallback, useRef, useState } from 'react'
import searchByInput from '../logic/search'
// import results from '../mocks/results.json'

const sorts = {
  downloadA: (a, b) => a.downloadCount > b.downloadCount,
  downloadD: (a, b) => a.downloadCount < b.downloadCount
}

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
      setBooks(newBooks)
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }, [])

  const sortBooks = useCallback(({ sort }) => {
    const sortedBooks = [...books].sort(sorts[sort])
    setBooks(sortedBooks)
  }, [books])

  return { books, error, getBooks, loading, sortBooks }
}
