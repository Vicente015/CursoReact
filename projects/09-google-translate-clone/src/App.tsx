import './App.css'
import debounce from 'just-debounce-it'
import { useCallback } from 'react'
import Input from './components/Input'
import InterchangeButton from './components/InterchangeButton'
import LanguageSelector from './components/LanguageSelector'
import TranslateButton from './components/TranslateButton'
import { useStore } from './hooks/useStore'
import useTranslateAPI from './hooks/useTranslateAPI'

function App () {
  const {
    interchangeLanguages,
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
    debounce(async (query: string) => { await getTranslation({ query }) }, 500),
    [getTranslation])

  const onSourceTextChange = (text: string) => {
    setSourceText(text)
    // debouncedGetTranslation(text)
  }

  const onTranslate = () => {
    debouncedGetTranslation(fromText)
  }

  const handleSpeak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    // todo: Convert to valid language
    utterance.lang = toLanguage
    utterance.rate = 0.9
    speechSynthesis.speak(utterance)
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
          flex flex-col gap-4
          md:flex-nowrap md:flex-row
        '
      >
        <section className='source w-full'>
          <LanguageSelector
            type='source'
            value={sourceLanguage}
            defaultValue={sourceLanguage}
            onChange={setSourceLanguage}
          />
          <Input
            value={fromText}
            handleChange={onSourceTextChange}
            placeholder='Escriba el texto a traducir'
            handleSpeak={() => { handleSpeak(fromText) }}
          />
        </section>
        <section className="flex flex-row items-start justify-center m-0 gap-2">
          <InterchangeButton handleClick={interchangeLanguages}></InterchangeButton>
          <TranslateButton handleClick={onTranslate}></TranslateButton>
        </section>
        <section className="target w-full">
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
            handleSpeak={() => { handleSpeak(result) }}
          />
        </section>
      </main>
    </>
  )
}

export default App
