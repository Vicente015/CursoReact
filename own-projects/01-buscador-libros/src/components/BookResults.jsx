import Books from './Books'

export default function BookResults ({ books, fetchError, loading }) {
  return (
    <section>
      {fetchError
        ? <p className='text-text-secondary'>Error, pruebe de nuevo.</p>
        : (loading ? <p className='text-text-secondary'>Cargando...</p> : <Books books={books} />)}
    </section>
  )
}
