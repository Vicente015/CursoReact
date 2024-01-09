import './App.css'
import { useEffect } from 'react'
import Input from './components/Input'
import LanguageSelector from './components/LanguageSelector'
import { useStore } from './hooks/useStore'

function App () {
  const { fromLanguage, setFromLanguages, setToLanguage, toLanguage } = useStore()

  return (
    <>
      <header>
        <h1>Traductor</h1>
      </header>
      <main>
        <section>
          <LanguageSelector
            onChange={(value) => { setFromLanguages(value) }}
            type='from'
            value={fromLanguage}
            defaultValue={fromLanguage}
          />
          <Input></Input>

          <section>
            <p>
              to: {toLanguage}
            </p>
            <p>
              from: {fromLanguage}
            </p>
          </section>
        </section>
      </main>
    </>
  )
}

export default App
