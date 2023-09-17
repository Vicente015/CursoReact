import * as Ariakit from '@ariakit/react'
import { useEffect } from 'react'
import { IoCloseCircleOutline, IoSearchSharp } from 'react-icons/io5'

export default function SearchInput ({ name, store, ...properties }) {
  /**
   * ? Validación custom de este componente
   * véase: https://ariakit.org/components/form#custom-validation
   */
  store.onValidate(() => {
    const value = store.getValue(name)
    const setError = (error) => store.setError(name, error)

    if (value === '') {
      setError('No se puede buscar una película vacía.')
    }

    if (/^\d+$/.test(value)) {
      setError('No se puede buscar una película con un número')
    }

    if (value.length < 3) {
      setError('La búsqueda debe tener al menos 3 caracteres.')
    }
  })

  /**
   * ? Reinicia el input del usuario cuando presione Esc
   * véase https://stackoverflow.com/a/57613476
   */
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        store.reset()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [store])

  return (
    <div
      className={`
        w-full
        flex flex-row items-center justify-between gap-2
        rounded-md
        px-3 py-2
        bg-bg-secondary
        border-2 border-solid border-accent-secondary
        shadow-[0px_2px_0px_0px] shadow-blue-500
        ${store.getError(name) === undefined
          ? 'hover:border-accent-primary hover:shadow-blue-600 focus-within:border-accent-primary focus-within:shadow-blue-600'
          : 'shadow-red-500 border-error'}
      `}
    >
      <IoSearchSharp aria-hidden className='icon-4' />
      <Ariakit.FormLabel name={name} hidden>Search bar</Ariakit.FormLabel>
      <Ariakit.FormInput
        id='search-input'
        autoFocus
        className='
          bg-transparent outline-none
          w-full h-full
          text-text-secondary
          placeholder:text-text-tertiary placeholder:font-normal text-lg
        '
        name={name} {...properties}
      />
      <Ariakit.FormReset className='flex flex-row gap-1 items-center'>
        <span
          className='
            tracking-tighter font-mono text-text-primary text-sm font-semibold
            px-2 py-1 bg-bg-extra rounded-md
          '
        >
          ESC
        </span>
        <IoCloseCircleOutline
          className='icon-4'
          title='Reset'
          aria-label='Reset'
        />
      </Ariakit.FormReset>
    </div>
  )
}
