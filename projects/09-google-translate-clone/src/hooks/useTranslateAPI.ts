import { useCallback, useRef } from 'react'
import z from 'zod'
import { type useStore } from './useStore'

type TypesFromStore = ReturnType<typeof useStore>
interface Props {
  query: string
  setResult: TypesFromStore['setResult']
  source: TypesFromStore['sourceLanguage']
  target: TypesFromStore['targetLanguage']
}

const TranslateResult = z.object({
  info: z.any(),
  translation: z.string()
})

export default function useTranslateAPI ({ query, setResult, source, target }: Props) {
  const previousQuery = useRef(query)

  const getTranslation = useCallback(async ({ query }: { query: string }) => {
    if (query === previousQuery.current) return

    try {
      const response = await fetch(`https://lingva.dialectapp.org/api/v1/${source}/${target}/${query}`)
      const responseResult = await response.json()
      const result = TranslateResult.parse(responseResult)
      if ((result?.translation).length > 0) setResult(result.translation)
    } catch (error) {
      console.error(error)
    }
  }, [query])

  return {
    getTranslation
  }
}
