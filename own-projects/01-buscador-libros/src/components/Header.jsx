
export default function Header () {
  return (
    <header className='
      grid place-items-center
      bg-bg-tertiary
      py-6 px-4
      border-b-2
      border-b-bg-extra
    '
    >
      <h1 id='search-label' className='text-3xl font-bold text-text-primary'>Buscador de libros 🔍</h1>
      <p className='text-lg font-medium text-text-secondary'>Un buscador interactivo para el «Proyecto Gutenberg».</p>
    </header>
  )
}
