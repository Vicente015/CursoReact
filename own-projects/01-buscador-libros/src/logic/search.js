
const API_URL = 'https://gutendex.com/books'

const mapBooks = (books) => books.map((book) => ({
  author: book.authors[0].name,
  coverImage: book.formats['image/jpeg'],
  downloadCount: book.download_count,
  id: book.id,
  languages: book.languages,
  title: book.title
}))

const sorts = {
  download: (a, b) => a.downloadCount > b.downloadCount
}

const sortBooks = (books, sort) => books.sort(sorts[sort])

export default async function searchByInput ({ query, sort }) {
  try {
    const searchParameters = new URLSearchParams()
    searchParameters.append('search', query)

    const response = await fetch(`${API_URL}?${searchParameters.toString()}`)
    const jsonData = await response.json()
    const books = jsonData.results

    return sortBooks(mapBooks(books), sort)
  } catch (error) {
    throw new Error('Error searching books', error)
  }
}
