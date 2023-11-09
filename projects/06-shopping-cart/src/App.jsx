import './index.css'
import { useState } from 'react'
import { Header } from './components/Header'
import { Products } from './components/Products'
import { products as initialProducts } from './mocks/products.json'

function App () {
  const [products] = useState(initialProducts)
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0
  })

  const filterProducts = (products) => {
    return products.filter(product => (
      product.price >= filters.minPrice &&
        (filters.category === 'all' || product.category === filters.category)
    ))
  }

  const filteredProducts = filterProducts(products)

  return (
    <div className='page'>
      <Header changeFilters={setFilters} />
      <Products products={filteredProducts} />
    </div>
  )
}

export default App
