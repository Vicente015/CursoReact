import './App.css'
import { useEffect, useRef, useState } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'

function useQuery () {
  const [query, setQuery] = useState('')
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

  return { error, query, setQuery }
}

function App () {
  // const { handleChange, results } = useSearchMovie()
  const { movies } = useMovies()
  const { error, query, setQuery } = useQuery()

  const handleSubmit = (event) => {
    // ? Prevenimos que el navegador reinicie cuando se envíe
    event.preventDefault()
    console.debug({ query })
  }

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  return (
    <div className='page'>
      <header>
        <h1>Proyecto 5</h1>
        <form className='form' onSubmit={handleSubmit}>
          <input
            style={{
              outline: '2px solid transparent',
              outlineColor: error ? 'red' : 'transparent'
            }}
            name='query'
            value={query}
            onChange={handleChange}
            type='text'
            id='query'
            placeholder='Avengers, Star Wars'
          />
          <button type='submit'>Buscar</button>
        </form>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
