import * as Ariakit from '@ariakit/react'
import { IoChevronDownOutline } from 'react-icons/io5'

function renderValue (value) {
  if (value.length === 0) return ''
  if (value.length === 1) return value[0]
  return `${value.length} seleccionados`
}

export default function Select ({ defaultValue, items, label, multiple = false, onChange, showValueInside = false }) {
  const store = Ariakit.useSelectStore({
    animated: true,
    defaultValue,
    setValue: (value) => {
      store.setValue(value)
      onChange({ filter: label, value })
    }
  })
  const value = store.useState().value
  store.useState('value')
  const mounted = store.useState('mounted')

  return (
    <div className='
      flex flex-row items-center gap-0 m-0 flex-nowrap whitespace-nowrap
      bg-bg-secondary rounded-md shadow-sm
      border-2 border-solid border-bg-tertiary w-full
      hover:border-accent-secondary focus-within:border-accent-secondary
    '
    >
      <Ariakit.Select
        store={store}
        className='
          flex flex-row items-center gap-0 m-0 justify-between px-2 w-full
          text-text-secondary font-semibold text-lg
          focus-visible:outline-none
        '
      >
        <div className='flex flex-row gap-1'>
          <Ariakit.SelectLabel
            store={store}
            style={{ cursor: 'pointer' }}
            className='text-text-secondary font-medium text-lg'
          >
            {label}
          </Ariakit.SelectLabel>
          {showValueInside && (multiple ? renderValue(value) : value)}
        </div>
        <IoChevronDownOutline aria-disabled aria-label='Chevron down' className='h-5 w-5' />
      </Ariakit.Select>
      {mounted && (
        <Ariakit.SelectPopover
          className='
            rounded-lg p-2 cursor-pointer shadow-sm bg-bg-secondary w-full
            border-2 border-solid border-bg-tertiary flex flex-col gap-0 justify-center
            child:text-base child:font-medium child:text-text-secondary
            child:rounded-md child:w-full child:px-1 child:py-1
            child-active:bg-blue-500 child-active:text-neutral-100
            child:flex child:flex-row child:gap-2 child:items-center
            z-50 overflow-auto overscroll-contain opacity-0
            data-[enter]:opacity-100 data-[enter]:translate-y-0
            whitespace-normal
          '
          style={{
            'max-height': 'min(var(--popover-available-height, 300px), 300px)',
            transform: 'translateY(2px)',
            'transition-duration': '150ms',
            'transition-property': 'opacity, transform',
            'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          store={store}
          gutter={4}
          arrowPadding={0}
          hideOnEscape
          sameWidth
        >
          {items.map((item) => (
            <Ariakit.SelectItem value={item} title={item} key={item}>
              {multiple && <Ariakit.SelectItemCheck />}
              {item}
            </Ariakit.SelectItem>
          ))}
        </Ariakit.SelectPopover>
      )}
    </div>
  )
}
