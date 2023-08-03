
const API_URL = 'https://www.omdbapi.com/'
const API_KEY = '4287ad07'

const mapMovies = (movies) => movies?.map((movie) => ({
  id: movie.imdbID,
  posterImg: movie.Poster,
  title: movie.Title,
  year: movie.Year
}))

export async function searchByInput ({ query }) {
  try {
    const searchParameters = new URLSearchParams()
    searchParameters.append('apiKey', API_KEY)
    searchParameters.append('s', query)

    const response = await fetch(`${API_URL}?${searchParameters.toString()}`)
    const jsonData = await response.json()
    const movies = jsonData.Search

    return mapMovies(movies)
  } catch (error) {
    throw new Error('Error searching movies', error)
  }
}
