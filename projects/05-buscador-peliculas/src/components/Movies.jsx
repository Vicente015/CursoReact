
export function ListOfMovies ({ movies }) {
  return (
    <ul>
      {
        movies.map(movie => (
          <li key={movie.id}>
            <h3>{movie.title}</h3>
            <p>{movie.year}</p>
            <img src={movie.posterImg} alt={movie.title} />
          </li>
        ))
      }
    </ul>
  )
}

export function NoMoviesResulsts () {
  return (
    <p>No se han encontrado películas para esta búsqueda.</p>
  )
}

export function Movies ({ movies }) {
  const hasMovies = movies.length >= 0

  return (
    hasMovies
      ? <ListOfMovies movies={movies} />
      : <NoMoviesResulsts />
  )
}
