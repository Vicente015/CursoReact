/* eslint-disable react-hooks/exhaustive-deps */
import './App.css'
import * as Ariakit from '@ariakit/react'
import debounce from 'just-debounce-it'
import { useCallback } from 'react'
import BookResults from './components/BookResults'

import Filters from './components/Filters'
import Header from './components/Header'
import SearchBar from './components/SearchBar'

import useBooks from './hooks/useBooks'

function App () {
  const form = Ariakit.useFormStore({
    defaultValues: { query: '' },
    setValues: (values) => {
      if (values.query === '') setBooks([])
      console.debug('valuesChanged', values)
      onInputChange(values.query)
    }
  })

  const { books, error: fetchError, getBooks, loading, setBooks } = useBooks({ query: form.getValue('query') })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetBooks = useCallback(
    debounce(query => getBooks({ query }), 500)
    , [getBooks])

  const onInputChange = (newQuery) => {
    console.debug('called validate')
    // ? Valida el formulario: si es correcto hace la query
    form.validate().then((isValid) => {
      if (isValid === true) debouncedGetBooks(form.getValue('query'))
    })
  }

  return (
    <div className='page bg-bg-primary'>
      <Header />
      <main
        className='
          flex flex-row gap-4
          mx-5 mt-4 pb-10 p-1
          sm:mx-10 md:mx-20 lg:mx-40 xl:mx-60
        '
      >
        <Filters books={books} />
        <section className='flex flex-col items-center w-full'>
          <SearchBar form={form} />
          <BookResults books={books} fetchError={fetchError} loading={loading} />
        </section>
      </main>
    </div>
  )
}

export default App
