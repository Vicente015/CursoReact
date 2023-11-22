import { useMemo } from 'react'
import DateSelect from './form/DateSelect'
import Select from './form/Select'
import SelectCombobox from './form/SelectCombobox'

export default function Filters ({ books, onFilterChange, onSortChange }) {
  const languages = useMemo(
    () => [...new Set(books.flatMap(book => book.languages))],
    [books]
  )
  const tags = useMemo(
    () => [...new Set(books.flatMap(book => book.tags))],
    [books]
  )
  const bookshelves = useMemo(
    () => [...new Set(books.flatMap(book => book.bookshelves))],
    [books]
  )
  const dates = useMemo(
    () => [...new Set([
      ...books.flatMap(book => book.author.birth_year).filter(book => !!book),
      ...books.flatMap(book => book.author.death_year).filter(book => !!book)
    ])].sort(),
    [books]
  )

  return (
    <aside
      className='
        flex flex-col items-start justify-start flex-nowrap
        gap-4 w-full min-w-[16rem] md:max-w-[16rem]
        child:child:mb-1
      '
    >
      <div className='w-full'>
        <h3 className='text-lg font-semibold text-text-primary'>Orden</h3>
        <Select
          label='Ordenar por'
          items={['id', 'descargas']}
          defaultValue='descargas'
          onChange={onSortChange}
          showValueInside
        />
      </div>
      <div className='w-full'>
        <h3 className='text-lg font-semibold text-text-primary'>Idiomas</h3>
        <Select
          label='Idiomas'
          items={languages}
          onChange={onFilterChange}
          showValueInside
        />
      </div>
      <div className='w-full'>
        <h3 className='text-lg font-semibold text-text-primary'>Librería</h3>
        <SelectCombobox
          items={bookshelves}
          label='Librería'
          defaultValue={[]}
          onChange={onFilterChange}
          multiple
        />
      </div>
      <div className='w-full'>
        <h3 className='text-lg font-semibold text-text-primary'>Etiquetas</h3>
        <SelectCombobox
          items={tags}
          label='Etiquetas'
          defaultValue={[]}
          onChange={onFilterChange}
          multiple
        />
      </div>
      <div className='w-full'>
        <h3 className='text-lg font-semibold text-text-primary'>Rango de años del autor</h3>
        <DateSelect
          items={dates}
          onChange={onFilterChange}
        />
      </div>
    </aside>
  )
}
