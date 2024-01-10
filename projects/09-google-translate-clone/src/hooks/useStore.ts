import { useReducer } from 'react'
import { type Action, type FromLanguage, type Language, type State } from '../types'

const initialState: State = {
  fromLanguage: 'auto',
  fromText: '',
  loading: true,
  result: '',
  toLanguage: 'en'
}

export const reducer: React.Reducer<State, Action> = (state, action) => {
  const { type } = action

  if (type === 'INTERCHANGE_LANGUAGES') {
    if (state.fromLanguage !== 'auto') {
      return {
        ...state,
        fromLanguage: state.toLanguage,
        toLanguage: state.fromLanguage
      }
    }
  }

  if (type === 'SET_FROM_LANGUAGE') {
    return {
      ...state,
      fromLanguage: action.payload
    }
  }

  if (type === 'SET_TO_LANGUAGE') {
    return {
      ...state,
      toLanguage: action.payload
    }
  }

  if (type === 'SET_FROM_TEXT') {
    return {
      ...state,
      fromText: action.payload,
      loading: true,
      result: ''
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

  const setFromLanguage = (language: FromLanguage) => {
    dispatch({
      payload: language,
      type: 'SET_FROM_LANGUAGE'
    })
  }

  const setToLanguage = (language: Language) => {
    dispatch({
      payload: language,
      type: 'SET_TO_LANGUAGE'
    })
  }

  const setFromText = (text: string) => {
    dispatch({
      payload: text,
      type: 'SET_FROM_TEXT'
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
    setFromLanguage,
    setFromText,
    setResult,
    setToLanguage
  }
}
