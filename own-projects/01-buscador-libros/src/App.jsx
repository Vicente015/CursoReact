import './App.css'
import debounce from 'just-debounce-it'
import { useCallback, useEffect, useRef, useState } from 'react'
import Books from './components/Books'
import useBooks from './hooks/useBooks'

function useQuery () {
  const [query, updateQuery] = useState('')
  const [error, setError] = useState(null)
  const isFirstInput = useRef(true)

  // Usar zod aquí sería god 🥵
  useEffect(() => {
    // ? Evitar que valide cuando el input esté vacío
    if (isFirstInput.current) {
      isFirstInput.current = query === ''
      return
    }
    if (query === '') {
      setError('No se puede buscar una película vacía.')
      return
    }

    if (/^\d+$/.test(query)) {
      setError('No se puede buscar una película con un número')
      return
    }

    if (query.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres.')
      return
    }

    setError(null)
  }, [query])

  return { error, query, updateQuery }
}

function App () {
  const { error: queryError, query, updateQuery } = useQuery()
  const [sort, updateSort] = useState(null)
  const { books, error: fetchError, getBooks, loading, sortBooks } = useBooks({ query })

  const debouncedGetBooks = useCallback(
    debounce(query => getBooks({ query }), 500)
    , [getBooks])

  // TODO: Se ejecuta el fetch aunque la validación de error ???
  const onInputChange = (event) => {
    const newQuery = event.target.value
    updateQuery(newQuery)
    debouncedGetBooks(query)
  }

  const onSortSelectChange = (event) => {
    console.debug('debug', event.target.value)
    updateSort(event.target.value)
    sortBooks({ sort })
  }

  const onSubmit = (event) => {
    event.preventDefault()
    getBooks({ query })
  }

  return (
    <div>
      <header>
        <h1>Buscador de libros 📚🔍</h1>
        <form onSubmit={onSubmit}>
          <input
            style={{
              outline: '2px solid transparent',
              outlineColor: queryError ? 'red' : 'transparent'
            }}
            id='query'
            type='text'
            value={query}
            placeholder='Harry Potter, Romeo and Juliet...'
            onChange={onInputChange}
          />
          <select name='sort' id='sort' onChange={onSortSelectChange}>
            <option value=''>Ordenar por:</option>
            <option value='downloadA'>Descargas ascendente</option>
            <option value='downloadD'>Descargas descendente</option>
          </select>
          <button type='submit'>Buscar</button>
        </form>
        {queryError && <p style={{ color: 'red' }}>{queryError}</p>}
      </header>
      <main>
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
