import './Filters.css'
import { useId, useState } from 'react'

export function Filters ({ changeFilters }) {
  const [minPrice, setMinPrice] = useState()
  const minPriceId = useId()
  const categoryId = useId()

  const handleChangeMinPrice = (event) => {
    setMinPrice(event.target.value)
    changeFilters(previousState => ({
      ...previousState,
      minPrice: event.target.value
    }))
  }

  const handleChangeCategory = (event) => {
    changeFilters(previousState => ({
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
        />
        <span>${minPrice}</span>
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
