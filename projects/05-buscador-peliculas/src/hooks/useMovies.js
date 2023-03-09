import responseMovies from '../mocks/avengers.json'

export function useMovies () {
  const movies = responseMovies.Search

  const mappedMovies = movies?.map((movie) => ({
    id: movie.imdbID,
    posterImg: movie.Poster,
    title: movie.Title,
    year: movie.Year
  }))

  return { movies: mappedMovies }
}
