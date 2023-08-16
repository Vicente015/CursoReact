
export default function Header () {
  return (
    <header className='
      grid place-items-center
      bg-neutral-200
      py-4 px-2
      border-b-2
      border-b-neutral-300
    '
    >
      <h1 id='search-label' className='text-2xl font-bold text-neutral-800'>Buscador de libros 🔍</h1>
      <p className='text-lg font-medium text-neutral-700'>Un buscador interactivo para el «Proyecto Gutenberg».</p>
    </header>
  )
}
