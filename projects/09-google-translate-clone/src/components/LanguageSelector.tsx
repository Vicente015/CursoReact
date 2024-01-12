import { languageList } from 'lingva-scraper'
import { type Language, type SourceLanguage } from '../types'
import SelectCombobox from './Select'

type Props =
  | { type: 'source', defaultValue: SourceLanguage, value: SourceLanguage, onChange: (language: SourceLanguage) => void }
  | { type: 'target', defaultValue: Language, value: Language, onChange: (language: Language) => void }

const LanguageSelector = ({ defaultValue, onChange, type, value }: Props) => {
  type SelectedLanguage = typeof value
  const languages = Object.entries(languageList[type]) as Array<[SelectedLanguage, string]>

  return (
    <SelectCombobox<SelectedLanguage>
      items={languages}
      label='Seleccione un lenguaje'
      // @ts-expect-error Idk how to fix
      onChange={onChange}
      value={value}
      defaultValue={defaultValue}
    ></SelectCombobox>
  )
}

export default LanguageSelector
