import { getTranslationText } from 'lingva-scraper'
import { useCallback, useRef } from 'react'
import { type useStore } from './useStore'

type TypesFromStore = ReturnType<typeof useStore>
interface Props {
  query: string
  setResult: TypesFromStore['setResult']
  source: TypesFromStore['fromLanguage']
  target: TypesFromStore['toLanguage']
}

export default function useScraper ({ query, setResult, source, target }: Props) {
  const previousQuery = useRef(query)

  const getTranslation = useCallback(async ({ query }: { query: string }) => {
    if (query === previousQuery.current) return

    try {
      const response = await fetch(`https://lingva.dialectapp.org/api/v1/${source}/${target}/${query}`)
      const result = await response.json() as unknown
      if (result !== null && result?.translation) setResult(result.translation)
    } catch (error) {
      console.error(error)
    }
  }, [query])

  return {
    getTranslation
  }
}
