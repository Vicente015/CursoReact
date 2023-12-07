import { useState } from 'react'
import { type TaskType, useTasksDispatch } from '../context/TasksContext'

const Task: React.FC<TaskType> = ({ completed, id, title }) => {
  const dispatch = useTasksDispatch()
  const [editable, setEditable] = useState(false)

  const handleCheck = () => {
    dispatch({
      payload: { completed: !completed, id },
      type: 'edit'
    })
  }

  const handleDestroy = () => {
    dispatch({
      payload: { id },
      type: 'delete'
    })
  }

  // todo: Añadir soporte a editar title

  return (
    <li className={`task ${completed ? 'disabled-task' : ''}`} id={id.toString()} >
      <input type="checkbox" name="check" id="check" onChange={handleCheck}/>
      <h4 >{title}</h4>
      <div className="icons">
        <i title="Editar tarea" className="fa-solid fa-pen-to-square" onClick={() => { setEditable(!editable) }}></i>
        <i title="Borrar tarea" className="fa-solid fa-trash" onClick={handleDestroy}></i>
      </div>
  </li>
  )
}

export { Task }
