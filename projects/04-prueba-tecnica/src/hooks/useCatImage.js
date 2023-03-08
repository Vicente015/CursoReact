import { useEffect, useState } from 'react'

const IMAGE_URL_PREFIX = 'https://cataas.com'

export function useCatImage ({ fact }) {
  const [imageUrl, setImageUrl] = useState()

  // ? Obtener imagen
  useEffect(() => {
    if (!fact) return

    const threeFirstWords = fact.split(' ', 3).join(' ')

    fetch(`https://cataas.com/cat/says/${threeFirstWords}?size=50&color=red&json=true`)
      .then(response => response.json())
      .then((data) => {
        const { url } = data
        setImageUrl(url)
      })
  }, [fact])

  return { imageUrl: `${IMAGE_URL_PREFIX}${imageUrl}` }
}
