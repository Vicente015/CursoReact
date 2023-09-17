
const API_URL = 'https://gutendex.com/books'

const mapBooks = (books) => books.map((book) => ({
  author: book.authors[0]?.name ?? '',
  bookshelves: book.bookshelves,
  coverImage: book.formats['image/jpeg'],
  downloadCount: book.download_count,
  id: book.id,
  languages: book.languages,
  tags: book.subjects[0].split(' -- '),
  title: book.title
}))

export default async function searchByInput ({ query }) {
  try {
    const searchParameters = new URLSearchParams()
    searchParameters.append('search', query)

    const response = await fetch(`${API_URL}?${searchParameters.toString()}`)
    const jsonData = await response.json()
    const books = jsonData.results

    return mapBooks(books)
  } catch (error) {
    // ! debug
    console.error(error)
    throw new Error('Error searching books', error)
  }
}
