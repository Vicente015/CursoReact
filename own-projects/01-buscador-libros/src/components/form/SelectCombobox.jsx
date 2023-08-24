import * as Ariakit from '@ariakit/react'
import { matchSorter } from 'match-sorter'
import { useDeferredValue, useMemo } from 'react'
import { IoChevronDownOutline } from 'react-icons/io5'

export default function SelectCombobox ({ defaultValue, items, label, multiple }) {
  const combobox = Ariakit.useComboboxStore({ resetValueOnHide: true })
  const select = Ariakit.useSelectStore({ animated: true, combobox, defaultValue })

  const value = combobox.useState('value')
  const deferredValue = useDeferredValue(value)
  const mounted = select.useState('mounted')

  const matches = useMemo(() => {
    return matchSorter(items, deferredValue, {
      baseSort: (a, b) => (a.index < b.index ? -1 : 1)
    })
  }, [deferredValue, items])

  return (
    <div className='
      flex flex-row items-center gap-0 flex-nowrap
      bg-bg-secondary rounded-md shadow-sm
      border-2 border-solid border-bg-tertiary w-full
      hover:border-accent-secondary focus-within:border-accent-secondary
    '
    >
      <Ariakit.Select
        store={select}
        className='
          flex flex-row items-center gap-0 m-0 justify-between px-2 w-full
          text-text-secondary font-semibold text-lg
          focus-visible:outline-none
        '
      >
        <div className='flex flex-row gap-1'>
          <Ariakit.SelectLabel
            store={select}
            style={{ cursor: 'pointer' }}
            className='text-text-secondary font-medium text-lg'
          >
            {label}
          </Ariakit.SelectLabel>
        </div>
        <IoChevronDownOutline aria-disabled aria-label='Chevron down' className='h-5 w-5' />
      </Ariakit.Select>
      {mounted && (
        <Ariakit.SelectPopover
          className='
            rounded-lg p-2 cursor-pointer shadow-sm bg-bg-secondary w-full
            border-2 border-solid border-bg-tertiary flex flex-col gap-2 justify-between
            child:flex child:flex-col child:gap-1 child:justify-center
            z-50 overflow-auto overscroll-contain opacity-0
            data-[enter]:opacity-100 data-[enter]:translate-y-0
            child:child:outline-none child:child:items-center
            child:child:scroll-m-2 child:child:scroll-mt-14
            child:child:text-base child:child:font-medium child:child:text-text-secondary
            child:child:rounded-md child:child:w-full child:child:px-1 child:child:py-1
          '
          style={{
            'max-height': 'min(var(--popover-available-height, 300px), 300px)',
            transform: 'translateY(2px)',
            'transition-duration': '150ms',
            'transition-property': 'opacity, transform',
            'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)'
          }}
          store={select}
          gutter={4}
          arrowPadding={0}
          hideOnEscape
          sameWidth
        >
          <div
            className='
              rounded-md bg-bg-tertiary
              sticky top-0 w-fit shadow-sm
            '
          >
            <Ariakit.Combobox
              store={combobox}
              autoSelect
              placeholder='Search...'
              className='
                bg-transparent w-full
                outline-accent-secondary
                placeholder:text-neutral-600 placeholder:font-normal text-lg
              '
            />
          </div>
          <Ariakit.ComboboxList store={combobox} className='child-active:bg-blue-500 child-active:text-neutral-100 child:flex child:flex-row child:gap-1 child:items-center'>
            {matches.map((value) => (
              <Ariakit.ComboboxItem
                key={value}
                focusOnHover
                className='select-item'
                render={<Ariakit.SelectItem value={value} title={value}>{multiple && <Ariakit.SelectItemCheck />}{value}</Ariakit.SelectItem>}
              />
            ))}
          </Ariakit.ComboboxList>
        </Ariakit.SelectPopover>
      )}
    </div>
  )
}
