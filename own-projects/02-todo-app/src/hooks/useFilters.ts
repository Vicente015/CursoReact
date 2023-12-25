import { useState } from 'react'
import { type TaskType } from '../types/Task'

export const FILTERS = {
  ACTIVAS: (task: TaskType) => !task.completed,
  COMPLETADAS: (task: TaskType) => task.completed,
  TODAS: () => true
} as const

export function useFilters () {
  const [filter, setFilter] = useState<keyof typeof FILTERS>('TODAS')

  const filterTasks = (tasks: TaskType[]) => tasks?.filter(FILTERS[filter])

  return {
    changeFilter: setFilter,
    filter,
    filterTasks
  }
}
