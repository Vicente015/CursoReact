import * as Ariakit from '@ariakit/react'
import { useEffect } from 'react'

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
      if (event.key === 'Escape') store.reset()
    }
    window.addEventListener('keydown', handleEsc)
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [store])

  return (
    <div
      className='
        w-full
        flex flex-row items-center justify-between gap-4
        rounded-lg
        px-4 py-2
        bg-neutral-100
        border-2 border-solid border-blue-500
        shadow-[0px_2px_0px_0px]
        shadow-blue-500
        hover:bg-neutral-50
        hover:border-blue-600
        hover:shadow-blue-600
      '
    >
      <span>🔍</span>
      <Ariakit.FormLabel name={name} hidden>Search bar</Ariakit.FormLabel>
      <Ariakit.FormInput
        id='search-input'
        autoFocus
        className='
          bg-transparent outline-none
          placeholder:text-neutral-500 placeholder:font-medium
          w-full h-full
        '
        name={name} {...properties}
      />
      <Ariakit.FormReset>Reset</Ariakit.FormReset>
    </div>
  )
}
