import { CopyIcon, Volume2Icon } from 'lucide-react'
import { type HTMLProps } from 'react'
import { type useStore } from '../hooks/useStore'

type TypesFromStore = ReturnType<typeof useStore>
interface Props {
  handleChange?: TypesFromStore['setSourceText']
  value: TypesFromStore['sourceText']
  placeholder: string
  handleSpeak: (text: any) => any
}

const Input: React.FC<Props & HTMLProps<HTMLTextAreaElement>> = ({ handleChange, handleSpeak, placeholder, value, ...props }) => {
  const handleTextAreaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    if (handleChange !== undefined) handleChange(event.target.value)
  }

  const handleClipboard = () => {
    navigator.clipboard.writeText(value).catch(() => { })
  }

  return (
    <div
      className='
      p-2 my-2 w-full
      bg-bg-secondary text-text-secondary rounded-md shadow-sm
      focus-within:outline focus-within:outline-2 focus-within:outline-accent-secondary
    '
    >
      <textarea
        className='resize-none w-full h-full bg-transparent focus:outline-none'
        rows={6}
        placeholder={placeholder}
        onChange={handleTextAreaChange}
        value={value}
        {...props}
      />
      <div className='flex gap-2 justify-end'>
        <button onClick={handleClipboard}>
          <CopyIcon className='text-neutral-400 hover:text-neutral-300'></CopyIcon>
        </button>
        <button onClick={handleSpeak}>
          <Volume2Icon className='text-neutral-400 hover:text-neutral-300'></Volume2Icon>
        </button>
      </div>

    </div>
  )
}

export default Input
