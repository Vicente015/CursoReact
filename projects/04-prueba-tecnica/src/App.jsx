import './App.css'
import { useCatFact } from './hooks/useCatFact'
import { useCatImage } from './hooks/useCatImage'

export function App () {
  const { fact, refreshFact } = useCatFact()
  const { imageUrl } = useCatImage({ fact })

  const handleClick = async () => {
    refreshFact()
  }

  return (
    <main>
      <h1>Gatetes :3</h1>

      {fact && <p>{fact}</p>}
      {imageUrl &&
        <img
          src={`${imageUrl}`}
          alt={`Image extracted using the first three words for ${fact}`}
        />}

      <button onClick={() => handleClick()}>Get new fact</button>
    </main>
  )
}
