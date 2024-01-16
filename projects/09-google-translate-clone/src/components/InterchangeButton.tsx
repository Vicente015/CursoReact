import { ArrowRightLeftIcon } from 'lucide-react'
import { type useStore } from '../hooks/useStore'

type TypesFromStore = ReturnType<typeof useStore>
interface Props {
  handleClick: TypesFromStore['interchangeLanguages']
}

const InterchangeButton: React.FC<Props> = ({ handleClick }) => {
  return (
    <button type="button" onClick={handleClick}>
      <ArrowRightLeftIcon className='w-8 h-8 text-neutral-400 border-neutral-500 border-2 border-solid rounded-md hover:text-neutral-300'></ArrowRightLeftIcon>
    </button>
  )
}

export default InterchangeButton
