import { useEffect, useState } from 'react'
import { searchByInput } from '../logic/search'

export function useSearchMovie () {
  const [query, setQuery] = useState()
  const [results, setResults] = useState()

  useEffect(() => {
    searchByInput({ query }).then(newResults => setResults(newResults))
  }, [query])

  const handleChange = (event) => {
    setQuery(event.target.value)
  }

  return { handleChange, results }
}
