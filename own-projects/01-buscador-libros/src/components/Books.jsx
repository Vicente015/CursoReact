import { AiOutlineFieldNumber } from 'react-icons/ai'
import { IoArrowDown, IoPricetag } from 'react-icons/io5'

export function Tag ({ name }) {
  return (
    <li className='
      flex flex-row items-center gap-1 px-2 py-1
      content-center
      bg-bg-extra rounded-lg
      hover:bg-accent-primary cursor-pointer
      '
    >
      <IoPricetag aria-disabled aria-label='Tag icon' className='min-h-[15px] min-w-[15px] text-text-tertiary' />
      <p className='text-sm font-medium text-text-secondary leading-snug' title={name}>
        {name.length > 6 ? name.slice(0, 6) + '...' : name}
      </p>
    </li>
  )
}

export function BookCard ({ book }) {
  return (
    <article
      className='
        grid gap-2
        bg-bg-tertiary
        p-0 m-0 rounded-lg
        hover:outline-2 hover:outline-none hover:outline-accent-tertiary
        hover:bg-opacity-60 cursor-pointer
      '
      style={{
        gridTemplateColumns: 'minmax(auto, 50%) 1fr'
      }}
    >
      <section className='border-r-2 border-r-bg-extra h-full'>
        <img className='w-full h-full rounded-l-xl' src={book.coverImage} alt={`${book.title} Book Cover Image`} />
      </section>
      <section className='book-info py-2 pr-2 flex flex-col'>
        <h3 className='text-lg font-semibold text-text-primary text-ellipsis line-clamp-5'>{book.title}</h3>
        <p className='text-base font-normal text-text-primary text-ellipsis line-clamp-2'>{book.author.name}</p>
        <ul className='flex items-center content-center flex-row flex-wrap gap-2 my-2'>
          {/* <IoPricetag aria-disabled aria-label='Tag icon' className='min-h-[15px] min-w-[15px] text-text-tertiary' />
          <p className='text-text-secondary'>Etiquetas</p> */}
          {book.tags.map(tag => (
            <Tag name={tag} key={tag} />
          ))}
          {book.languages.map(tag => (
            <Tag name={tag} key={tag} />
          ))}
        </ul>
        <section className='flex flex-row gap-1 mt-auto self-end'>
          <AiOutlineFieldNumber aria-disabled aria-label='ID icon' className='min-h-[15px] min-w-[15px] text-text-tertiary' />
          <small className='text-text-secondary text-xs font-mono self-end mt-auto'>{book.id}</small>
          <IoArrowDown aria-disabled aria-label='ID icon' className='min-h-[15px] min-w-[15px] text-text-tertiary' />
          <small className='text-text-secondary text-xs font-mono self-end mt-auto'>{book.downloadCount}</small>
        </section>
      </section>
    </article>
  )
}

export function ListOfBooks ({ books }) {
  return (
    <ul
      className='
        grid gap-4 mt-8
        sm:grid-cols-[repeat(2,_minmax(200px,_1fr))]
        md:grid-cols-[repeat(2,_minmax(200px,_1fr))]
        lg:grid-cols-[repeat(3,_minmax(200px,_1fr))]
        xl:grid-cols-[repeat(4,_minmax(200px,_1fr))]
      '
      style={{
        gridAutoRows: 'minmax(0, 1fr)' // ? hace que todas las columnas tengan mismo tamaño
      }}
    >
      {
        books.map(book => (
          <BookCard book={book} key={book.id} />
        ))
      }
    </ul>
  )
}

export function NoBooks () {
  return (
    <p className='text-text-secondary'>No hay resultados.</p>
  )
}

export default function Books ({ books }) {
  // ? Only show books with `show = true`
  return (
    books && books.length > 0
      ? <ListOfBooks books={books} />
      : <NoBooks />
  )
}
