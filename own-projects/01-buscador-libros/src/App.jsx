import './App.css'
import { useRef, useState } from 'react'
import Books from './components/Books'
import useBooks from './hooks/useBooks'

function App () {
  const [query, updateQuery] = useState(null)
  const sortSelectReference = useRef()
  const { books, error, getBooks, loading } = useBooks({ query })

  const onChange = (event) => {
    updateQuery(event.target.value)
  }

  const onSubmit = (event) => {
    event.preventDefault()
    getBooks({ query, sort: sortSelectReference.current.value })
  }

  return (
    <div>
      <header>
        <h1>Buscador de libros</h1>
        <form onSubmit={onSubmit}>
          <input
            id='query'
            type='text'
            placeholder='Harry Potter...'
            onChange={onChange}
          />
          <select name='sort' id='sort' ref={sortSelectReference}>
            <option value=''>Ordenar por:</option>
            <option value='download'>Descargas</option>
          </select>
          <button type='submit'>Buscar</button>
        </form>
      </header>
      <main>
        <section>
          {error
            ? <p>Error, pruebe de nuevo.</p>
            : (loading ? <p>Cargando...</p> : <Books books={books} />)}
        </section>
      </main>
    </div>
  )
}

export default App
