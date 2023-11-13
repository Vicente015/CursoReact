import './index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { FiltersProvider } from './context/filters.jsx'

ReactDOM.createRoot(document.querySelector('#root')).render(
  <FiltersProvider>
    <App />
  </FiltersProvider>
)
