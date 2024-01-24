import { CopyIcon, Volume2Icon } from 'lucide-react'
import { type HTMLProps } from 'react'
import BeatLoader from 'react-spinners/BeatLoader'
import { type useStore } from '../hooks/useStore'

type TypesFromStore = ReturnType<typeof useStore>
interface Props {
  handleChange?: TypesFromStore['setSourceText']
  value: TypesFromStore['sourceText']
  placeholder: string
  handleSpeak: (text: any) => any
  disabled?: boolean
  loading?: boolean
}

const Input: React.FC<Props & HTMLProps<HTMLTextAreaElement>> = ({ disabled, handleChange, handleSpeak, loading, placeholder, value, ...props }) => {
  const handleTextAreaChange: React.ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    if (handleChange !== undefined) handleChange(event.target.value)
  }

  console.debug(loading)

  const handleClipboard = () => {
    navigator.clipboard.writeText(value).catch(() => { })
  }

  return (
    <div
      className='
      p-2 my-2 flex flex-col content-between min-h-12 h-full
      bg-bg-secondary text-text-secondary rounded-md shadow-sm
      focus-within:outline focus-within:outline-2 focus-within:outline-accent-secondary
    '
    >
      {
        loading === true
          ? <div className='flex flex-col items-center content-center justify-center w-full h-full'>
            <BeatLoader
              color='gray'
              loading={loading}
              size={20}
              aria-label="Loading Spinner"
            />
          </div>
          : <textarea
          className='resize-none w-full h-full bg-transparent focus:outline-none'
          rows={6}
          placeholder={placeholder}
          onChange={handleTextAreaChange}
          value={value}
          disabled={disabled}
          {...props}
        />
      }
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
