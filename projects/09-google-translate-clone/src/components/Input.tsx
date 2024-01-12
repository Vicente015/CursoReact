import { type HTMLProps } from 'react'
import { type useStore } from '../hooks/useStore'

type TypesFromStore = ReturnType<typeof useStore>
interface Props {
  handleChange?: TypesFromStore['setSourceText']
  value: TypesFromStore['sourceText']
  placeholder: string
}

const Input: React.FC<Props & HTMLProps<HTMLTextAreaElement>> = ({ handleChange, placeholder, value, ...props }) => {
  const handleTextAreaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    if (handleChange !== undefined) handleChange(event.target.value)
  }

  return (
    <textarea
      className='
        p-2 my-2 w-full resize-none
        bg-bg-secondary text-text-secondary rounded-md shadow-sm
      '
      rows={6}
      placeholder={placeholder}
      onChange={handleTextAreaChange}
      value={value}
      {...props}
    />
  )
}

export default Input
