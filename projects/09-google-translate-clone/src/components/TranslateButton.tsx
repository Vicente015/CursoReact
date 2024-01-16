import { ZapIcon } from 'lucide-react'

interface Props {
  handleClick: () => void
}

const TranslateButton: React.FC<Props> = ({ handleClick }) => {
  return (
    <button type="button" onClick={handleClick}>
      <ZapIcon className='w-8 h-8 text-neutral-400 border-neutral-500 border-2 border-solid rounded-md hover:text-neutral-300'></ZapIcon>
    </button>
  )
}

export default TranslateButton
