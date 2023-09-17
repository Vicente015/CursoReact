/* eslint-disable react-hooks/exhaustive-deps */
import './App.css'
import * as Ariakit from '@ariakit/react'
import debounce from 'just-debounce-it'
import { useCallback, useEffect, useMemo, useState } from 'react'
import Books from './components/Books'

import Select from './components/form/Select'
import SelectCombobox from './components/form/SelectCombobox'
import Header from './components/Header'
import SearchInput from './components/SearchInput'
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

  const { books, error: fetchError, filterBooks, getBooks, loading, setBooks, sortBooks } = useBooks({ query: form.getValue('query') })
  const languages = useMemo(
    () => [...new Set(books.flatMap(book => book.languages))],
    [books]
  )
  const tags = useMemo(
    () => [...new Set(books.flatMap(book => book.tags))],
    [books]
  )
  const bookshelves = useMemo(
    () => [...new Set(books.flatMap(book => book.bookshelves))],
    [books]
  )

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

  // # Selects states
  const [sortState, setSortSate] = useState()
  const [langFilterState, setLangFilterState] = useState()
  const [bookshelfFilterState, setBookshelfFilterState] = useState()
  const [tagsFilterState, setTagsFilterState] = useState()

  useEffect(() => {
    sortBooks({ sort: sortState })
  }, [sortState])

  useEffect(() => {
    filterBooks({ filter: 'lang', value: langFilterState })
  }, [langFilterState])

  useEffect(() => {
    filterBooks({ filter: 'bookshelves', value: bookshelfFilterState })
  }, [bookshelfFilterState])

  useEffect(() => {
    filterBooks({ filter: 'tags', value: tagsFilterState })
  }, [tagsFilterState])

  return (
    <div className='page bg-bg-primary'>
      <Header />
      <main
        className='
          flex flex-row gap-4
          mx-5 mt-4 pb-10 p-1
          sm:mx-10 md:mx-20 lg:mx-40 xl:mx-60
        '
        style={{
          // 'inline-size': 'min(75ch, 100% - 4rem)'
        }}
      >
        <aside
          className='
            flex flex-col items-start justify-start flex-nowrap
            gap-4 w-full max-w-[16rem]
          '
        >
          <div className='w-full'>
            <h3 className='text-lg font-semibold text-text-primary'>Orden</h3>
            <Select
              label='Ordenar por'
              items={['id', 'descargas']}
              defaultValue='Descargas'
              showValueInside
              value={sortState}
              onChange={setSortSate}
            />
          </div>
          <div className='w-full'>
            <h3 className='text-lg font-semibold text-text-primary'>Idiomas</h3>
            <Select
              label='Elige los idiomas'
              items={languages}
              defaultValue='none'
              value={langFilterState}
              onChange={setLangFilterState}
            />
          </div>
          <div className='w-full'>
            <h3 className='text-lg font-semibold text-text-primary'>Librería</h3>
            <SelectCombobox
              items={bookshelves}
              label='Librería'
              value={bookshelfFilterState}
              defaultValue={[]}
              onChange={setBookshelfFilterState}
              multiple
            />
          </div>
          <div className='w-full'>
            <h3 className='text-lg font-semibold text-text-primary'>Etiquetas</h3>
            <SelectCombobox
              items={tags}
              label='Etiquetas'
              defaultValue={[]}
              value={tagsFilterState}
              onChange={setTagsFilterState}
              multiple
            />
          </div>
          {/* <div className='w-full'>
            <h3 className='text-lg font-semibold text-text-primary'>Rango de fechas</h3>
            <DateSelect />
          </div> */}
        </aside>
        <section
          className='flex flex-col items-center w-full'
        >
          <section className='w-full'>
            <Ariakit.Form
              store={form}
              resetOnSubmit={false}
              aria-labelledby='search-label'
            >
              <div className='field'>
                <SearchInput
                  name={form.names.query}
                  store={form}
                  type='text'
                  placeholder='Romeo And Juliet'
                  required
                  title='Search'
                />
              </div>
              <Ariakit.FormError name={form.names.query} className='text-text-secondary' />
            </Ariakit.Form>
          </section>
          <section>
            {fetchError
              ? <p className='text-text-secondary'>Error, pruebe de nuevo.</p>
              : (loading ? <p className='text-text-secondary'>Cargando...</p> : <Books books={books} />)}
          </section>
        </section>
      </main>
    </div>
  )
}

export default App
