import { useEffect, useState } from 'react'
import { getRandomFact } from '../logic/facts'

export function useCatFact () {
  const [fact, setFact] = useState()

  const refreshFact = () => {
    getRandomFact()
      .then((newFact) => setFact(newFact))
  }

  useEffect(refreshFact, [])

  return { fact, refreshFact }
}
