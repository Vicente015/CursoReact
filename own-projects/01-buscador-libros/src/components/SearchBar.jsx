import * as Ariakit from '@ariakit/react'
import debounce from 'just-debounce-it'
import { useCallback } from 'react'
import SearchInput from './form/SearchInput'

export default function SearchBar ({ getBooks, query, setQuery }) {
  const form = Ariakit.useFormStore({
    setValues: (values) => {
      onInputChange(values.query)
      setQuery(values)
    },
    values: query
  })

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedGetBooks = useCallback(
    debounce(query => getBooks({ query }), 500),
    [getBooks])

  const onInputChange = (newQuery) => {
    // ? Valida el formulario: si es correcto hace la query
    form.validate().then((isValid) => {
      if (isValid === true) debouncedGetBooks(newQuery)
    })
  }

  return (
    <section className='w-full'>
      <Ariakit.Form
        store={form}
        resetOnSubmit={false}
        aria-labelledby='search-label'
      >
        <div className='field'>
          <SearchInput
            name='query'
            store={form}
            type='text'
            placeholder='Romeo And Juliet'
            required
            title='Search'
          />
        </div>
        <Ariakit.FormError name={form.names.query} className='text-error' />
      </Ariakit.Form>
    </section>
  )
}
