import { ArrowRightLeftIcon } from 'lucide-react'
import { type useStore } from '../hooks/useStore'

type TypesFromStore = ReturnType<typeof useStore>
interface Props {
  handleClick: TypesFromStore['interchangeLanguages']
}

const InterchangeButton: React.FC<Props> = ({ handleClick }) => {
  return (
    <button type="button" onClick={handleClick}>
      <ArrowRightLeftIcon className='text-gray-500'></ArrowRightLeftIcon>
    </button>
  )
}

export default InterchangeButton
