
const API_URL = 'https://www.omdbapi.com/'
const API_KEY = '4287ad07'

export async function searchByInput ({ query }) {
  const searchParameters = new URLSearchParams()
  searchParameters.append('apiKey', API_KEY)
  searchParameters.append('s', query)

  const response = await fetch(`${API_URL}?${searchParameters.toString()}`)
  const data = await response.json()
  return data
}
