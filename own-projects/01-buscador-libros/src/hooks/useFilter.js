import { useCallback, useState } from 'react'

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
    let accumulator_
    for (const [name, value] of enabledFilters.entries()) {
      if (!name.includes('Ordenar')) accumulator_ = books.filter((item) => filters[name](item, value))
    }
    setFilteredBooks(accumulator)
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
