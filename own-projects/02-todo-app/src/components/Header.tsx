import { Trash2Icon } from 'lucide-react'
import { useMemo } from 'react'
import { useTasks, useTasksDispatch } from '../context/TasksContext'

export const Header: React.FC = () => {
  const tasks = useTasks()
  const dispatch = useTasksDispatch()

  const completedTasks = useMemo(() => {
    return tasks.filter(task => task.completed).length
  }, [tasks])

  const onTrashClick = () => {
    dispatch({
      type: 'remove-completed'
    })
  }

  return (
    <header>
        <div className='header-content'>
          <span></span>
          <div>
            <h3>Lista de tareas</h3>
            <p>Completadas: {completedTasks}/{tasks.length}</p>
          </div>
          <Trash2Icon className='fa-solid fa-trash-can' onClick={onTrashClick}></Trash2Icon>
      </div>
    </header>
  )
}
