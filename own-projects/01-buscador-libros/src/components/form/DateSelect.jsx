import { IoCalendarOutline } from 'react-icons/io5'
import { PiArrowsHorizontalBold } from 'react-icons/pi'
import BaseSelect from './BaseSelect'

export default function DateSelect ({ items, onChange, showValueInside = true }) {
  return (
    <div className='
      flex flex-row items-center gap-0 m-0 pl-2 flex-nowrap whitespace-nowrap
      bg-bg-secondary rounded-md shadow-sm
      border-2 border-solid border-bg-tertiary w-full
      hover:border-accent-secondary focus-within:border-accent-secondary
    '
    >
      <IoCalendarOutline aria-disabled aria-label='Calendar icon' className='h-5 w-5 text-text-ter m-0' />
      <div className='flex flex-row gap-0 items-center justify-center w-fit m-auto'>
        <BaseSelect onChange={onChange} defaultValue={items[0]} items={items} label='FechaInicio' showValueInside={showValueInside} />
        <PiArrowsHorizontalBold aria-disabled aria-label='Arrows left right icon' className='h-fit w-5 text-text-tertiary' />
        <BaseSelect onChange={onChange} defaultValue={items.at(-1)} items={items} label='FechaFin' showValueInside={showValueInside} />
      </div>
    </div>
  )
}
