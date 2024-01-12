import { type LangCode } from 'lingva-scraper'

const auto = 'auto' as const

export type Language = Exclude<LangCode, 'auto'>
export type AutoLanguage = typeof auto
export type SourceLanguage = Language | AutoLanguage

export interface State {
  sourceLanguage: SourceLanguage
  targetLanguage: Language
  sourceText: string
  result: string
  loading: boolean
}

export type Action =
  | { type: 'SET_SOURCE_LANGUAGE', payload: SourceLanguage }
  | { type: 'INTERCHANGE_LANGUAGES' }
  | { type: 'SET_TARGET_LANGUAGE', payload: Language }
  | { type: 'SET_SOURCE_TEXT', payload: string }
  | { type: 'SET_RESULT', payload: string }
