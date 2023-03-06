import './App.css'
import { useCatFact } from './hooks/useCatFact'
import { useCatImage } from './hooks/useCatImage'

const IMAGE_URL_PREFIX = 'https://cataas.com'

export function App () {
  const { fact, refreshFact } = useCatFact()
  const { imageUrl } = useCatImage({ fact })

  const handleClick = async () => {
    refreshFact()
  }

  return (
    <main>
      <h1>Gatetes :3</h1>
      <button onClick={() => handleClick()}>Get new fact</button>

      {fact && <p>{fact}</p>}
      {imageUrl &&
        <img
          src={`${IMAGE_URL_PREFIX}${imageUrl}`}
          alt={`Image extracted using the first three words for ${fact}`}
        />}
    </main>
  )
}
