import { type useStore } from '../hooks/useStore'

type TypesFromStore = ReturnType<typeof useStore>
interface Props {
  onChange: TypesFromStore['setFromText']
  value: TypesFromStore['fromText']
  placeholder: string
}

const Input: React.FC<Props> = ({ onChange, placeholder, value }) => {
  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    onChange(event.target.value)
  }

  return (
    <textarea
      className='
        p-2 my-2 w-full resize-none
        bg-bg-secondary text-text-secondary rounded-md shadow-sm
      '
      rows={6}
      placeholder={placeholder}
      onChange={handleChange}
      value={value}
    />
  )
}

export default Input
