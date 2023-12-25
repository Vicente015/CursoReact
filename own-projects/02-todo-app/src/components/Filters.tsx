import { capitalCase } from 'case-anything'
import React from 'react'
import { FILTERS, type useFilters } from '../hooks/useFilters'

interface Props {
  changeFilter: ReturnType<typeof useFilters>['changeFilter']
  filter: ReturnType<typeof useFilters>['filter']
}

export const Filters: React.FC<Props> = ({ changeFilter, filter }) => {
  return (
    <section className="filters-section">
      {Object.keys(FILTERS).map((key) => {
        return (
          <button
            key={key}
            className={filter === key ? 'active' : ''}
            onClick={() => { changeFilter(key as keyof typeof FILTERS) }}
          >
            {capitalCase(key)}
          </button>
        )
      })}
    </section>
  )
}
