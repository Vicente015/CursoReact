import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { FiltersProvider } from './components/context/filters'

ReactDOM.createRoot(document.querySelector('#root')).render(
  <FiltersProvider>
    <App />
  </FiltersProvider>
)
