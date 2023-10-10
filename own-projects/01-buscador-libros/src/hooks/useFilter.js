import { useCallback } from 'react'

const filters = {
  Etiquetas: (item, value) => value.some((tag) => item.tags.includes(tag)),
  Idiomas: (item, value) => item.languages.includes(value),
  Librería: (item, value) => value.some((bookshelf) => item.bookshelves.includes(bookshelf))
}

const sorts = {
  descargas: (a, b) => a.downloadCount < b.downloadCount,
  id: (a, b) => a.id > b.id
}

export default function useFilter ({ setFilteredBooks }) {
  const filterBooks = useCallback(({ books, enabledFilters }) => {
    let accumulator
    for (const [name, value] of enabledFilters.entries()) {
      accumulator = books.filter((item) => filters[name](item, value))
    }
    setFilteredBooks(accumulator)
  }, [setFilteredBooks])

  const sortBooks = useCallback(({ books, sort }) => {
    if (!books) return
    const sortedBooks = [...books].sort(sorts[sort])
    setFilteredBooks(sortedBooks)
  }, [setFilteredBooks])

  return { filterBooks, sortBooks }
}
