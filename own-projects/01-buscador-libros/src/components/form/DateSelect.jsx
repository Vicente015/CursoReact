import * as Ariakit from '@ariakit/react'
import { IoCalendarOutline } from 'react-icons/io5'
import { PiArrowsHorizontalBold } from 'react-icons/pi'
import BaseSelect from './BaseSelect'

const currentYear = new Date().getFullYear()
const items = [1000, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, currentYear]

export default function DateSelect ({ showValueInside }) {
  const label = 'Fecha'

  const firstStore = Ariakit.useSelectStore({
    animated: true,
    defaultValue: 1000
  })

  const secondStore = Ariakit.useSelectStore({
    animated: true,
    defaultValue: currentYear
  })

  return (
    <div className='
      flex flex-row items-center justify-center gap-0 m-0 px-2 flex-nowrap whitespace-nowrap
      bg-bg-secondary rounded-md shadow-sm
      border-2 border-solid border-bg-tertiary w-full
      hover:border-accent-secondary focus-within:border-accent-secondary
    '
    >
      <IoCalendarOutline aria-disabled aria-label='Calendar icon' className='h-5 w-5 text-neutral-800' />
      <div className='flex flex-row gap-0 items-center justify-center m-auto'>
        <BaseSelect items={items} label={label} showValueInside store={firstStore} />
        <PiArrowsHorizontalBold aria-disabled aria-label='Arrows left right icon' className='h-5 w-5 text-neutral-600' />
        <BaseSelect items={items} label={label} showValueInside store={secondStore} />
      </div>
    </div>
  )
}
