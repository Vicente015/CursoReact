import { useState } from 'react'
import { type TaskType, useTasksDispatch } from '../context/TasksContext'

const Task: React.FC<TaskType> = ({ completed, id, title }) => {
  const dispatch = useTasksDispatch()
  const [isEditing, setEditing] = useState(false)
  const [text, setText] = useState(title)

  const cancelEditing = () => {
    setText('')
    setEditing(false)
  }

  const handleEdit: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setText(event.target.value)
  }

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    if (event.key === 'Enter') {
      dispatch({
        payload: { id, title: text },
        type: 'edit'
      })
      cancelEditing()
    }
    if (event.key === 'Escape') {
      cancelEditing()
    }
  }

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

  const enableEditing = () => {
    setText(title)
    setEditing(true)
  }

  return (
    <li className={`task ${completed ? 'disabled-task' : ''}`} id={id.toString()} >
      {isEditing
        ? (
          <>
            <input type="text" className='title-edit' name="title-edit" id="title-edit" value={text} onChange={handleEdit} onKeyDown={handleKeyDown} />
            <div className="icons">
              <i title='Cancelar (Escape)' className='fa-solid fa-xmark' onClick={cancelEditing}></i>
            </div>
          </>
          )
        : (
          <>
            <input className='checkbox' type="checkbox" name="check" id="check" onChange={handleCheck}/>
            <h4>{title}</h4>
            <div className="icons">
              <i title="Editar tarea" className="fa-solid fa-pen-to-square" onClick={enableEditing}></i>
              <i title="Borrar tarea" className="fa-solid fa-trash" onClick={handleDestroy}></i>
            </div>
          </>
          ) }
    </li>
  )
}

export { Task }
