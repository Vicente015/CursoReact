
export default function Header () {
  return (
    <header className='
      grid place-items-center
      bg-neutral-200
      py-6 px-4
      border-b-2
      border-b-neutral-300
    '
    >
      <h1 id='search-label' className='text-4xl font-bold text-neutral-800'>Buscador de libros 🔍</h1>
      <p className='text-xl font-medium text-neutral-700'>Un buscador interactivo para el «Proyecto Gutenberg».</p>
    </header>
  )
}
