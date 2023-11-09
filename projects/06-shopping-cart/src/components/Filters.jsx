import './Filters.css'
import { useState } from 'react'

export function Filters ({ changeFilters }) {
  const [minPrice, setMinPrice] = useState()

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
        <label htmlFor='price'>Price</label>
        <input
          type='range'
          name='price'
          id='price'
          min='0'
          max='1000'
          onChange={handleChangeMinPrice}
        />
        <span>${minPrice}</span>
      </div>
      <div>
        <label htmlFor='category'>Category</label>
        <select name='category' id='category' onChange={handleChangeCategory}>
          <option value='all'>All</option>
          <option value='laptops'>Laptops</option>
          <option value='smartphones'>Smartphones</option>
        </select>
      </div>
    </section>
  )
}
