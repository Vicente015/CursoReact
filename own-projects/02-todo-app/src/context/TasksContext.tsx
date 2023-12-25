/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createContext, type PropsWithChildren, useContext, useReducer } from 'react'
import { type ActionType, type TaskType } from '../types/Task'
import { genId } from '../utils/genId'

const initialTasks: TaskType[] = [
  {
    color: 'light',
    completed: false,
    id: genId(),
    title: 'Initial task'
  }
]

export const TasksContext = createContext<TaskType[]>(null!)
export const TasksDispatchContext = createContext<React.Dispatch<ActionType>>(null!)

export const TasksProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [tasks, dispatch] = useReducer(
    reducer,
    initialTasks
  )

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  )
}

export function useTasks () {
  return useContext(TasksContext)
}

export function useTasksDispatch () {
  return useContext(TasksDispatchContext)
}

const reducer: React.Reducer<TaskType[], ActionType> = (tasks, action) => {
  switch (action.type) {
    case 'add': {
      const newTask: TaskType = { color: 'light', completed: false, id: genId(), title: action.payload.title }
      return [newTask, ...tasks]
    }

    case 'edit': {
      return tasks.map((task) => {
        if (task.id === action.payload.id) {
          return { ...task, ...action.payload }
        } else {
          return task
        }
      })
    }

    case 'delete': {
      return tasks.filter((task) => task.id !== action.payload.id)
    }

    case 'remove-completed': {
      return tasks.filter((task) => !task.completed)
    }
  }
}
