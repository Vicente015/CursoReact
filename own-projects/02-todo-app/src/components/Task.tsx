import { useState } from 'react'
import { usePopper } from 'react-popper'
import { type TaskType, useTasksDispatch } from '../context/TasksContext'
import { Portal } from '../utils/Portal'

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
    if (event.key === 'Enter' && Boolean(text.trim())) {
      dispatch({
        payload: { id, title: text.trim() },
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

  // todo: Confirmación al borrar

  const [referenceElement, setRefenceElement] = useState()
  const [popperElement, setPopperElement] = useState()
  const [showTooltip, setShowTooltip] = useState(false)
  const { attributes, styles, update: popperUpdate } = usePopper(referenceElement, popperElement, {
    placement: 'top'
  })

  const tooltipShow = () => {
    setShowTooltip(!showTooltip)
    if (popperUpdate !== null) popperUpdate()
  }

  // TODO: Dejar de usar FontAwesome

  return (
  <>
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
              <i title='Opciones' className='fa-solid fa-bars' ref={setRefenceElement} onClick={tooltipShow}></i>
            </div>
          </>
          ) }
    </li>

    <Portal>
      <div className={`tooltip ${showTooltip ? 'show' : 'hidden'}`} ref={setPopperElement} style={styles.popper} {...attributes.popper}>
          <div data-popper-arrow></div>
        <p>Esto es una prueba</p>
      </div>
    </Portal>
  </>
  )
}

export { Task }
