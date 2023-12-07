import './index.css'
import { useEffect, useId, useReducer } from 'react'
import { NewTask } from './components/NewTask'
import { TasksList, type TaskType } from './components/Todos'

const initialTasks: TaskType[] = [
  {
    completed: false,
    id: '1',
    title: 'owo'
  }
]

type ActionType =
  | { type: 'add', payload: { text: string } }
  | { type: 'change', payload: TaskType }

// todo: usar reducer con context
// véase: https://react.dev/learn/scaling-up-with-reducer-and-context
const tasksReducer: React.Reducer<typeof initialTasks, ActionType> = (tasks, action) => {
  switch (action.type) {
    case 'add': {
      return [...tasks, { completed: false, id: Math.random(), title: action.payload.text }]
    }

    case 'change': {
      return tasks.map((task) => {
        if (task.id === action.payload.id) {
          return action.payload
        } else {
          return task
        }
      })
    }
  }
}

const App: React.FC = () => {
  const [tasks, dispatch] = useReducer(
    tasksReducer,
    initialTasks
  )

  useEffect(() => {
    console.debug('tasks', tasks)
  }, [tasks])

  const handleAddTask = (text: string): void => {
    dispatch({
      payload: { text },
      type: 'add'
    })
  }

  return (
    <main>
      <section>
        <h1>📑 Lista de tareas</h1>
      </section>

      <NewTask onTaskAdd={handleAddTask}></NewTask>
      <TasksList tasks={tasks}></TasksList>
    </main>
  )
}

export default App
