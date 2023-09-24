import { useMemo } from 'react'
import Select from './form/Select'
import SelectCombobox from './form/SelectCombobox'

export default function Filters ({ books }) {
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

  return (
    <aside
      className='
        flex flex-col items-start justify-start flex-nowrap
        gap-4 w-full max-w-[16rem]
      '
    >
      <div className='w-full'>
        <h3 className='text-lg font-semibold text-text-primary'>Orden</h3>
        <Select
          label='Ordenar por'
          items={['id', 'descargas']}
          defaultValue='Descargas'
          showValueInside
          value={sortState}
          onChange={setSortSate}
        />
      </div>
      <div className='w-full'>
        <h3 className='text-lg font-semibold text-text-primary'>Idiomas</h3>
        <Select
          label='Elige los idiomas'
          items={languages}
          defaultValue='none'
          value={langFilterState}
          onChange={setLangFilterState}
        />
      </div>
      <div className='w-full'>
        <h3 className='text-lg font-semibold text-text-primary'>Librería</h3>
        <SelectCombobox
          items={bookshelves}
          label='Librería'
          value={bookshelfFilterState}
          defaultValue={[]}
          onChange={setBookshelfFilterState}
          multiple
        />
      </div>
      <div className='w-full'>
        <h3 className='text-lg font-semibold text-text-primary'>Etiquetas</h3>
        <SelectCombobox
          items={tags}
          label='Etiquetas'
          defaultValue={[]}
          value={tagsFilterState}
          onChange={setTagsFilterState}
          multiple
        />
      </div>
      {/* <div className='w-full'>
            <h3 className='text-lg font-semibold text-text-primary'>Rango de fechas</h3>
            <DateSelect />
          </div> */}
    </aside>
  )
}
