import { useCallback, useState } from "react"

const filters = {
  'Librería': (item, value) => value.some((bookshelf) => item.bookshelves.includes(bookshelf)),
  'Idiomas': (item, value) => item.languages.includes(value),
  'Etiquetas': (item, value) => value.some((tag) => item.tags.includes(tag)),
}

const sorts = {
  descargas: (a, b) => a.downloadCount < b.downloadCount,
  id: (a, b) => a.id > b.id
}

export default function useFilter ({ setFilteredBooks }) {
  const filterBooks = useCallback(({ books, enabledFilters }) => {
    let acc
    for (let [name, value] of enabledFilters.entries()) {
      if (!name.includes('Ordenar')) acc = books.filter((item) => filters[name](item, value))
    }
    setFilteredBooks(acc)
  }, [])

  const sortBooks = useCallback(({ books, sort }) => {
    if (books) setFilteredBooks(books.sort(sorts[sort]))
  }, [])

  /*   const sortBooks = useCallback(({ sort }) => {
    console.debug('sort called', sort)
    const sortedBooks = [...books].sort(sorts[sort])
    setBooks(sortedBooks)
  }, [books]) */

  return { filterBooks, sortBooks }
}
