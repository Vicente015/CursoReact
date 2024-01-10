import './App.css'
import debounce from 'just-debounce-it'
import { getTranslationText } from 'lingva-scraper'
import { useCallback } from 'react'
import Input from './components/Input'
import LanguageSelector from './components/LanguageSelector'
import useScraper from './hooks/useScraper'
import { useStore } from './hooks/useStore'

function App () {
  const {
    fromLanguage,
    fromText,
    result,
    setFromLanguage,
    setFromText,
    setResult,
    setToLanguage,
    toLanguage
  } = useStore()
  const { getTranslation } = useScraper({ query: fromText, setResult, source: fromLanguage, target: toLanguage })

  const debouncedGetTranslation = useCallback(
    debounce(async (query: string) => { await getTranslation({ query }) }, 1000),
    [getTranslation])

  const onSourceChange = (text: string) => {
    setFromText(text)
    debouncedGetTranslation(text)
  }

  return (
    <>
      <header className='py-4 m-auto shadow-lg text-center bg-bg-primary text-text-primary flex-col gap-1'>
        <h1 className='font-bold text-xl'>Translate</h1>
        <p>Using <a className='text-accent-tertiary' href='https://github.com/thedaviddelta/lingva-translate' target='_blank' rel="noreferrer">Lingva Translate</a></p>
      </header>
      <main
        className='
          w-fill max-w-[80ch] m-auto p-4
          grid grid-cols-1 gap-4
          lg:grid-cols-2
        '
      >
        <section className='source'>
          <LanguageSelector
            type='from'
            value={fromLanguage}
            defaultValue={fromLanguage}
            onChange={setFromLanguage}
          />
          <Input
            value={fromText}
            onChange={onSourceChange}
            placeholder='Escriba el texto a traducir'
          />
        </section>
        <section className="target">
          <LanguageSelector
            type='to'
            value={toLanguage}
            defaultValue={toLanguage}
            onChange={setToLanguage}
          />
          <Input
            value={result}
            placeholder=''
          />
        </section>
      </main>
    </>
  )
}

export default App
