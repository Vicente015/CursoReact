import './App.css'
import { useRef, useState } from 'react'
import { Movies } from './components/Movies'
import { useMovies } from './hooks/useMovies'

function App () {
  // const { handleChange, results } = useSearchMovie()
  const { movies } = useMovies()
  const [query, setQuery] = useState('')

  // const { query } = Object.fromEntries(new FormData(event.target))
  const handleSubmit = (event) => {
    // ? Prevenimos el comportamiento por defecto y que no se reinicie cada vez que hagamos submit
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
          <input name='query' value={query} onChange={handleChange} type='text' id='query' placeholder='Avengers' />
          <button type='submit'>Buscar</button>
        </form>
      </header>
      <main>
        <Movies movies={movies} />
      </main>
    </div>
  )
}

export default App
