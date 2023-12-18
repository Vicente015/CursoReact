import { useState } from 'react'
import { usePopper } from 'react-popper'
import { useTasksDispatch } from '../context/TasksContext'
import { type TaskType } from '../types/Task'
import { colors } from '../utils/Constants'
import { Portal } from '../utils/Portal'

const Task: React.FC<TaskType> = ({ color, completed, id, title }) => {
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

  const onColorChange: React.MouseEventHandler<HTMLLIElement> = (event) => {
    const newColor = event.target as HTMLElement
    dispatch({
      payload: { color: newColor.id, id },
      type: 'edit'
    })
  }

  const enableEditing = () => {
    setText(title)
    setEditing(true)
  }

  // todo: Confirmación al borrar

  type usePopperParameters = Parameters<typeof usePopper>

  const [referenceElement, setReferenceElement] = useState<usePopperParameters[0]>()
  const [popperElement, setPopperElement] = useState<usePopperParameters[1]>()
  const [showTooltip, setShowTooltip] = useState(false)
  const { attributes, styles, update: popperUpdate } = usePopper(referenceElement, popperElement, {
    placement: 'top'
  })

  const tooltipShow = () => {
    setShowTooltip(!showTooltip)
    if (popperUpdate !== null) void popperUpdate()
  }

  return (
  <>
    <li className={`task ${completed ? 'disabled-task' : ''}`} id={id.toString()} style={{ backgroundColor: `var(--gnome-${color}2)` }}>
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
              <i title='Opciones' className='fa-solid fa-bars' ref={setReferenceElement} onClick={tooltipShow}></i>
            </div>
          </>
          ) }
    </li>

    <Portal>
      <div className={`tooltip ${showTooltip ? 'show' : 'hidden'}`} ref={setPopperElement} style={styles.popper} {...attributes.popper}>
          <div data-popper-arrow></div>
          <ul style={{ display: 'grid', gap: '.2em', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {colors.map((color) => {
              return (
                <li key={color}
                  id={color}
                  onClick={onColorChange}
                  style={{
                    backgroundColor: `var(--gnome-${color}2)`,
                    borderRadius: '100%',
                    cursor: 'pointer',
                    listStyle: 'none',
                    padding: '.8em'
                  }}
                ></li>
              )
            })
            }
          </ul>
      </div>
    </Portal>
  </>
  )
}

export { Task }
