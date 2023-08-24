import './App.css'
import * as Ariakit from '@ariakit/react'
import debounce from 'just-debounce-it'
import { useCallback } from 'react'

import Books from './components/Books'
import Select from './components/form/Select'
import SelectCombobox from './components/form/SelectCombobox'
import Header from './components/Header'
import SearchInput from './components/SearchInput'
import useBooks from './hooks/useBooks'

import mockResults from './mocks/results.json'

const subjects =
  [...new Set(mockResults.results.flatMap(result => result.subjects))]

const genres =
  [...new Set(mockResults.results.flatMap(result => result.bookshelves))]

// const [sort, updateSort] = useState(null)
/* const onSortSelectChange = (event) => {
  console.debug('debug', event.target.value)
  updateSort(event.target.value)
  sortBooks({ sort })
} */
/*
  <select name='sort' id='sort' onChange={onSortSelectChange}>
    <option value=''>Ordenar por:</option>
    <option value='downloadA'>Descargas ascendente</option>
    <option value='downloadD'>Descargas descendente</option>
  </select>
*/

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
        style={{
          // 'inline-size': 'min(75ch, 100% - 4rem)'
        }}
      >
        <aside
          className='
            flex flex-col items-start justify-start flex-nowrap
            gap-4 w-fit
          '
        >
          <div className='w-full'>
            <h3 className='text-lg font-semibold text-text-primary'>Orden</h3>
            <Select
              label='Ordenar por'
              defaultValue='publicación'
              items={['publicación', 'descargas']}
              showValueInside
            />
          </div>
          <div className='w-full'>
            <h3 className='text-lg font-semibold text-text-primary'>Idiomas</h3>
            <Select
              label='Elige los idiomas'
              items={['Español', 'Inglés']}
              defaultValue='Inglés'
            />
          </div>
          <div className='w-full'>
            <h3 className='text-lg font-semibold text-text-primary'>Géneros literarios</h3>
            {
              // todo: El showValueInside hace que cambie todo de tamaño constantemente
            }
            <Select
              label='Géneros literarios'
              items={genres}
              defaultValue={[]}
              multiple
            />
          </div>
          <div className='w-full'>
            <h3 className='text-lg font-semibold text-text-primary'>Géneros literario</h3>
            <SelectCombobox items={genres} label='Géneros literarios' defaultValue={[]} multiple />
          </div>
          <div className='w-full'>
            <h3 className='text-lg font-semibold text-text-primary'>Temáticas</h3>
            <SelectCombobox items={subjects} label='Temáticas' />
          </div>
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
