import * as Ariakit from '@ariakit/react'
import SearchInput from './components/SearchInput'

export default function SearchBar ({ form }) {
  return (
    <section className='w-full'>
      <Ariakit.Form
        store={form}
        resetOnSubmit={false}
        aria-labelledby='search-label'
      >
        <div className='field'>
          <SearchInput
            name={form.names.query}
            store={form}
            type='text'
            placeholder='Romeo And Juliet'
            required
            title='Search'
          />
        </div>
        <Ariakit.FormError name={form.names.query} className='text-text-secondary' />
      </Ariakit.Form>
    </section>
  )
}
