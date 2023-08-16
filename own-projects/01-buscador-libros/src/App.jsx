import './App.css'
import * as Ariakit from '@ariakit/react'
import debounce from 'just-debounce-it'
import { useCallback } from 'react'

import Books from './components/Books'
import Header from './components/Header'
import SearchInput from './components/SearchInput'
import useBooks from './hooks/useBooks'

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
      if (values.query) onInputChange(values.query)
    }
  })
  const { books, error: fetchError, getBooks, loading, setBooks } = useBooks({ query: form.getValue('query') })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetBooks = useCallback(
    debounce(query => getBooks({ query }), 500)
    , [getBooks])

  const onInputChange = (newQuery) => {
    // ? Valida el formulario: si es correcto hace la query
    form.validate().then((isValid) => {
      if (isValid === true) debouncedGetBooks(form.getValue('query'))
    })
  }

  return (
    <div className='dkk'>
      <Header />
      <main className='bg-neutral-100 w-full h-full'>
        <section>
          <Ariakit.Form
            store={form}
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
            <Ariakit.FormError name={form.names.query} />
          </Ariakit.Form>
        </section>
        <section>
          {fetchError
            ? <p>Error, pruebe de nuevo.</p>
            : (loading ? <p>Cargando...</p> : <Books books={books} />)}
        </section>
      </main>
    </div>
  )
}

export default App
