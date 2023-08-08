export function ListOfBooks ({ books }) {
  return (
    <ul className='books'>
      {
        books.map(book => (
          <li className='book' key={book.id}>
            <img src={book.coverImage} alt={`${book.title} Cover Image`} />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <small>{book.downloadCount}</small>
          </li>
        ))
      }
    </ul>
  )
}

export function NoBooks () {
  return (
    <p>No hay resultados.</p>
  )
}

export default function Books ({ books }) {
  return (
    books && books.length > 0
      ? <ListOfBooks books={books} />
      : <NoBooks />
  )
}
