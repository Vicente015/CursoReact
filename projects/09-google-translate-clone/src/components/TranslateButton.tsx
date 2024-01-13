import { ZapIcon } from 'lucide-react'

interface Props {
  handleClick: () => void
}

const TranslateButton: React.FC<Props> = ({ handleClick }) => {
  return (
    <button type="button" onClick={handleClick}>
      <ZapIcon className='text-gray-500'></ZapIcon>
    </button>
  )
}

export default TranslateButton
