import { useCallback, useRef, useState } from 'react'
import searchByInput from '../logic/search'
// import results from '../mocks/results.json'

/* const sorts = {
  descargas: (a, b) => a.downloadCount < b.downloadCount,
  id: (a, b) => a.id > b.id
} */
/*
const filters = {
  bookshelves: (item, bookshelves) => bookshelves.some((bookshelf) => item.bookshelves.includes(bookshelf)),
  lang: (item, langs) => item.languages.includes(langs),
  tags: (item, tags) => tags.some((tag) => item.tags.includes(tag))
}
 */
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

  /*   const sortBooks = useCallback(({ sort }) => {
    console.debug('sort called', sort)
    const sortedBooks = [...books].sort(sorts[sort])
    setBooks(sortedBooks)
  }, [books]) */

  return { books, error, getBooks, loading, setBooks }
}
