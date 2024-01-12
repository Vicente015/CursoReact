import { useReducer } from 'react'
import { type Action, type Language, type SourceLanguage, type State } from '../types'

const initialState: State = {
  loading: true,
  result: '',
  sourceLanguage: 'auto',
  sourceText: '',
  targetLanguage: 'en'
}

export const reducer: React.Reducer<State, Action> = (state, action) => {
  const { type } = action

  if (type === 'INTERCHANGE_LANGUAGES') {
    if (state.sourceLanguage !== 'auto') {
      return {
        ...state,
        sourceLanguage: state.targetLanguage,
        targetLanguage: state.sourceLanguage
      }
    }
  }

  if (type === 'SET_SOURCE_LANGUAGE') {
    return {
      ...state,
      sourceLanguage: action.payload
    }
  }

  if (type === 'SET_TARGET_LANGUAGE') {
    return {
      ...state,
      targetLanguage: action.payload
    }
  }

  if (type === 'SET_SOURCE_TEXT') {
    return {
      ...state,
      loading: true,
      result: '',
      sourceText: action.payload
    }
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: action.payload
    }
  }

  return state
}

export function useStore () {
  const [state, dispatch] = useReducer(reducer, initialState)

  const interchangeLanguages = () => {
    dispatch({
      type: 'INTERCHANGE_LANGUAGES'
    })
  }

  const setSourceLanguage = (language: SourceLanguage) => {
    dispatch({
      payload: language,
      type: 'SET_SOURCE_LANGUAGE'
    })
  }

  const setTargetLanguage = (language: Language) => {
    dispatch({
      payload: language,
      type: 'SET_TARGET_LANGUAGE'
    })
  }

  const setSourceText = (text: string) => {
    dispatch({
      payload: text,
      type: 'SET_SOURCE_TEXT'
    })
  }

  const setResult = (result: string) => {
    dispatch({
      payload: result,
      type: 'SET_RESULT'
    })
  }

  return {
    ...state,
    interchangeLanguages,
    setResult,
    setSourceLanguage,
    setSourceText,
    setTargetLanguage
  }
}
