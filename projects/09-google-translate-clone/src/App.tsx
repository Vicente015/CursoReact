import './App.css'
import debounce from 'just-debounce-it'
import { useCallback } from 'react'
import Input from './components/Input'
import LanguageSelector from './components/LanguageSelector'
import { useStore } from './hooks/useStore'
import useTranslateAPI from './hooks/useTranslateAPI'

function App () {
  const {
    result,
    setResult,
    setSourceLanguage,
    setSourceText,
    setTargetLanguage,
    sourceLanguage,
    sourceText: fromText,
    targetLanguage: toLanguage
  } = useStore()
  const { getTranslation } = useTranslateAPI({ query: fromText, setResult, source: sourceLanguage, target: toLanguage })

  const debouncedGetTranslation = useCallback(
    debounce(async (query: string) => { await getTranslation({ query }) }, 1_500),
    [getTranslation])

  const onSourceChange = (text: string) => {
    setSourceText(text)
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
            type='source'
            value={sourceLanguage}
            defaultValue={sourceLanguage}
            onChange={setSourceLanguage}
          />
          <Input
            value={fromText}
            handleChange={onSourceChange}
            placeholder='Escriba el texto a traducir'
          />
        </section>
        <section className="target">
          <LanguageSelector
            type='target'
            value={toLanguage}
            defaultValue={toLanguage}
            onChange={setTargetLanguage}
          />
          <Input
            disabled={true}
            value={result}
            placeholder=''
          />
        </section>
      </main>
    </>
  )
}

export default App
