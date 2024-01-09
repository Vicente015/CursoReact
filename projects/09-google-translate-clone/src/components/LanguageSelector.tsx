import { languageList } from 'lingva-scraper'
import { type FromLanguage, type Language } from '../types'
import SelectCombobox from './Select'

type Props =
  | { type: 'from', defaultValue: FromLanguage, value: FromLanguage, onChange: (language: FromLanguage) => void }
  | { type: 'to', defaultValue: Language, value: Language, onChange: (language: Language) => void }

// todo: Hacer funcionar props
// todo: Renombrar to y from a source y target para mayor legibilidad

const LanguageSelector = ({ defaultValue, onChange, type, value }: Props) => {
  type SelectedLanguage = typeof type extends 'from' ? FromLanguage : Language
  const languages = Object.entries(languageList[type === 'from' ? 'source' : 'target']) as Array<[SelectedLanguage, string]>

  return (
    <SelectCombobox<SelectedLanguage>
      items={languages}
      label='Seleccione un lenguaje'
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
    ></SelectCombobox>
  )
}

export default LanguageSelector
