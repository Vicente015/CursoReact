import { useEffect } from 'react'

export default function SearchPage ({ routeParameters }) {
  useEffect(() => {
    document.title = `Has buscado ${routeParameters.query}`
  }, [])

  return (
    <h1>Has buscado {routeParameters.query}</h1>
  )
}
