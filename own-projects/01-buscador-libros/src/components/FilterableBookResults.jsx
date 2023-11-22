/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from 'react'
import useBooks from '../hooks/useBooks'
import useFilter from '../hooks/useFilter'
import BookResults from './BookResults'
import Filters from './Filters'
import SearchBar from './SearchBar'

export default function FilterableBookResults () {
  const [query, setQuery] = useState({ query: '' })
  const { books, error: fetchError, getBooks, loading } = useBooks({ query })
  const [filteredBooks, setFilteredBooks] = useState()
  const [enabledFilters, setEnabledFilters] = useState(new Map())
  const { filterBooks, sortBooks } = useFilter({ setFilteredBooks })

  const onFilterChange = useCallback(({ filter, value }) => {
    if (!value || (Array.isArray(value) && value.length === 0) || value === '') {
      enabledFilters.delete(filter)
    } else {
      enabledFilters.set(filter, value)
    }

    // todo: no funciona bien en conjunto con filtro de años
    console.debug('awa', enabledFilters, value)
    filterBooks({ books, enabledFilters })
  }, [filterBooks, books, enabledFilters])

  const onSortChange = useCallback(({ filter, value }) => {
    sortBooks({ books: filteredBooks ?? books, sort: value })
  }, [sortBooks, books, filteredBooks])

  return (
    <main
      className='
        flex flex-row gap-4 md:flex-nowrap flex-wrap
        mx-5 mt-4 pb-10 p-1
        sm:mx-10 md:mx-20 lg:mx-40 xl:mx-60
      '
    >
      <Filters books={books} onFilterChange={onFilterChange} onSortChange={onSortChange} />
      <section className='flex flex-col items-center w-full'>
        <SearchBar query={query} getBooks={getBooks} setQuery={setQuery} />
        <BookResults books={filteredBooks ?? books} fetchError={fetchError} loading={loading} />
      </section>
    </main>
  )
}
