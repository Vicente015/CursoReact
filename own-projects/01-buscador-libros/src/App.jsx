/* eslint-disable react-hooks/exhaustive-deps */
import './App.css'

import FilterableBookResults from './components/FilterableBookResults'
import Header from './components/Header'

function App () {
  return (
    <div className='page bg-bg-primary'>
      <Header />
      <FilterableBookResults />
    </div>
  )
}

export default App
