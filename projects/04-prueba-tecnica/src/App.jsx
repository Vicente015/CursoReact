import { useEffect, useState } from 'react'
import { getRandomFact } from './logic/facts'
import './App.css'

const IMAGE_URL_PREFIX = 'https://cataas.com'

export function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  // 1 efecto por responsabilidad
  // ? Obtener fact
  useEffect(() => {
    getRandomFact()
      .then((randomFact) => setFact(randomFact))
  }, [])

  // ? Obtener imagen
  useEffect(() => {
    if (!fact) return
    const threeFirstWords = fact.split(' ', 3)
    fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
      .then(res => res.json())
      .then((data) => {
        const { url } = data
        setImageUrl(url)
      })
  }, [fact])

  const handleClick = async () => {
    const randomFact = getRandomFact()
    setFact(randomFact)
  }

  return (
    <main>
      <h1>Gatetes :3</h1>
      <button onClick={() => handleClick}>Get new fact</button>

      {fact && <p>{fact}</p>}
      {imageUrl &&
        <img
          src={`${IMAGE_URL_PREFIX}${imageUrl}`}
          alt={`Image extracted using the first three words for ${fact}`}
        />}
    </main>
  )
}
