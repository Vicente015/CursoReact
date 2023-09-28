import { useCallback, useState } from "react"

const filters = {
  'Librería': (item, value) => value.some((bookshelf) => item.bookshelves.includes(bookshelf)),
  'Idiomas': (item, value) => item.languages.includes(value),
  'Etiquetas': (item, value) => value.some((tag) => item.tags.includes(tag))
}

export default function useFilter ({ setFilteredBooks }) {
  const filterBooks = useCallback(({ books, enabledFilters }) => {
    let acc
    for (let [name, value] of enabledFilters.entries()) {
      acc = books.filter((item) => filters[name](item, value))
    }
    setFilteredBooks(acc)
  }, [])

  /*   const sortBooks = useCallback(({ sort }) => {
    console.debug('sort called', sort)
    const sortedBooks = [...books].sort(sorts[sort])
    setBooks(sortedBooks)
  }, [books]) */

  return { filterBooks }
}
