import { type LangCode } from 'lingva-scraper'

const auto = 'auto' as const

export type Language = Exclude<LangCode, 'auto'>
export type AutoLanguage = typeof auto
export type FromLanguage = Language | AutoLanguage

export interface State {
  fromLanguage: FromLanguage
  toLanguage: Language
  fromText: string
  result: string
  loading: boolean
}

export type Action =
  | { type: 'SET_FROM_LANGUAGE', payload: FromLanguage }
  | { type: 'INTERCHANGE_LANGUAGES' }
  | { type: 'SET_TO_LANGUAGE', payload: Language }
  | { type: 'SET_FROM_TEXT', payload: string }
  | { type: 'SET_RESULT', payload: string }
