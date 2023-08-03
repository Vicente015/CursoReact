
export function ListOfMovies ({ movies }) {
  return (
    <ul className='movies'>
      {
        movies.map(movie => (
          <li className='movie' key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img src={movie.posterImg} alt={movie.title} />
          </li>
        ))
      }
    </ul>
  )
}

export function NoMoviesResults () {
  return (
    <p>No se han encontrado películas para esta búsqueda.</p>
  )
}

export function Movies ({ movies }) {
  const hasMovies = !!movies && movies.length >= 0

  return (
    hasMovies
      ? <ListOfMovies movies={movies} />
      : <NoMoviesResults />
  )
}
