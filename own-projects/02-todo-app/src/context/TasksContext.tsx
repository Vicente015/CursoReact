/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { createContext, type PropsWithChildren, useContext, useReducer } from 'react'

export interface TaskType {
  id: ReturnType<typeof genId>
  title: string
  completed: boolean
}

export type ActionType =
  | { type: 'add', payload: { title: string } }
  | { type: 'edit', payload: Omit<Partial<TaskType>, 'id'> & Pick<TaskType, 'id'> } // makes every property optional except Id
  | { type: 'delete', payload: { id: TaskType['id'] } }

const genId = () => crypto.randomUUID()

const initialTasks = [
  {
    completed: false,
    id: genId(),
    title: 'Initial task'
  }
]

export const TasksContext = createContext<TaskType[]>(null!)
export const TasksDispatchContext = createContext<React.Dispatch<ActionType>>(null!)

export const TasksProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
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

const tasksReducer: React.Reducer<typeof initialTasks, ActionType> = (tasks, action) => {
  switch (action.type) {
    case 'add': {
      return [{ completed: false, id: genId(), title: action.payload.title }, ...tasks]
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
  }
}
