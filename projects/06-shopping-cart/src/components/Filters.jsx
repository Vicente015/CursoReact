import './Filters.css'
import { useId } from 'react'
import { useFilters } from '../hooks/useFilters.js'

export function Filters () {
  const { filters, setFilters } = useFilters()

  const minPriceId = useId()
  const categoryId = useId()

  const handleChangeMinPrice = (event) => {
    setFilters(previousState => ({
      ...previousState,
      minPrice: event.target.value
    }))
  }

  const handleChangeCategory = (event) => {
    setFilters(previousState => ({
      ...previousState,
      category: event.target.value
    }))
  }

  return (
    <section className='filters'>
      <div>
        <label htmlFor={minPriceId}>Price</label>
        <input
          type='range'
          id={minPriceId}
          min='0'
          max='1000'
          onChange={handleChangeMinPrice}
          value={filters.minPrice}
        />
        <span>${filters.minPrice}</span>
      </div>
      <div>
        <label htmlFor={categoryId}>Category</label>
        <select id={categoryId} onChange={handleChangeCategory}>
          <option value='all'>All</option>
          <option value='laptops'>Laptops</option>
          <option value='smartphones'>Smartphones</option>
        </select>
      </div>
    </section>
  )
}
