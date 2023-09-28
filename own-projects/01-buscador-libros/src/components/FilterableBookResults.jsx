/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from 'react'
import useBooks from '../hooks/useBooks'
import useFilter from '../hooks/useFilter'
import BookResults from './BookResults'
import Filters from './Filters'
import SearchBar from './SearchBar'

export default function FilterableBookResults () {
  const [query, setQuery] = useState({ query: '' })
  const [enabledFilters, setEnabledFilters] = useState(new Map())
  const { books, error: fetchError, getBooks, loading } = useBooks({ query })
  const [filteredBooks, setFilteredBooks] = useState()
  const { filterBooks } = useFilter({ books, setFilteredBooks, enabledFilters })

  // todo: Hacer lógica para el sort
  const onFilterChange = useCallback(({ filter, value }) => {
    !!value && value?.length > 0 ? enabledFilters.set(filter, value) : enabledFilters.delete(filter)
    filterBooks({ enabledFilters, books })
  }, [filterBooks, books])

  return (
    <main
      className='
        flex flex-row gap-4
        mx-5 mt-4 pb-10 p-1
        sm:mx-10 md:mx-20 lg:mx-40 xl:mx-60
      '
    >
      <Filters books={books} onFilterChange={onFilterChange} />
      <section className='flex flex-col items-center w-full'>
        <SearchBar query={query} getBooks={getBooks} setQuery={setQuery} />
        <BookResults books={filteredBooks ?? books} fetchError={fetchError} loading={loading} />
      </section>
    </main>
  )
}
