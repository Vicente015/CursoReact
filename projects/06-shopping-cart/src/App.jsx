import './index.css'
import { useState } from 'react'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { Products } from './components/Products'
import { products as initialProducts } from './mocks/products.json'

function useFilters () {
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

  return { filterProducts, setFilters }
}

function App () {
  const [products] = useState(initialProducts)
  const { filterProducts, setFilters } = useFilters()
  const filteredProducts = filterProducts(products)

  return (
    <>
      <Header changeFilters={setFilters} />
      <Products products={filteredProducts} />
      <Footer />
    </>
  )
}

export default App
