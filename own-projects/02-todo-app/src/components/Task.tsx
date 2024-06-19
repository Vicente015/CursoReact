import { EditIcon, MenuIcon, TrashIcon, XCircleIcon } from 'lucide-react'
import { useRef, useState } from 'react'
import { usePopper } from 'react-popper'
import { useTasksDispatch } from '../context/TasksContext'
import { type ColorsUnion, type TaskType } from '../types/Task'
import { colors } from '../utils/Constants'
import { Portal } from '../utils/Portal'

const Task: React.FC<TaskType> = ({ color, completed, id, title }) => {
  const dispatch = useTasksDispatch()
  const [isEditing, setEditing] = useState(false)
  const [text, setText] = useState(title)
  const [showTooltip, setShowTooltip] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)

  const cancelEditing = () => {
    setText(title)
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

  // https://code.whatever.social/questions/54383386/react-typescript-correct-type-for-event-handler-prop

  const onColorChange: React.MouseEventHandler<HTMLLIElement> = (event) => {
    const newColor = event.target as HTMLElement
    dispatch({
      payload: { color: newColor.id as ColorsUnion, id },
      type: 'edit'
    })
  }

  const enableEditing = () => {
    setText(title)
    setEditing(true)
    inputRef.current?.focus()
  }

  // todo: Confirmación al borrar

  const tooltipShow = () => {
    setShowTooltip(!showTooltip)
  }

  const [referenceElement, setReferenceElement] = useState<HTMLElement | SVGSVGElement | null>(null)
  const [popperElement, setPopperElement] = useState<HTMLElement | null>(null)
  const { attributes, styles } = usePopper(referenceElement, popperElement, {
    placement: 'top'
  })

  return (
    <>
      <li
        className={`task ${completed ? 'disabled-task' : ''}`}
        id={id.toString()}
        style={{ backgroundColor: `var(--gnome-${color}2)` }}
        onDoubleClick={enableEditing}
      >
        {isEditing
          ? (
          <>
            <input
              ref={inputRef}
              type="text"
              className="title-edit"
              name="title-edit"
              id="title-edit"
              value={text}
              onChange={handleEdit}
              onKeyDown={handleKeyDown}
            />
            <div className="icons">
              <XCircleIcon className="fa-solid fa-xmark" onClick={cancelEditing} />
            </div>
          </>
            )
          : (
          <>
            <input
              className="checkbox"
              type="checkbox"
              name="check"
              id="check"
              value={`${completed}`}
              checked={completed}
              onChange={handleCheck}
            />
            <h4>{title}</h4>
            <div className="icons">
              <EditIcon className="fa-solid fa-pen-to-square" onClick={enableEditing} />
              <TrashIcon className="fa-solid fa-trash" onClick={handleDestroy} />
              <MenuIcon className="fa-solid fa-bars" ref={setReferenceElement} onClick={tooltipShow} />
            </div>
          </>
            )}
      </li>

      <Portal>
        <div className={`tooltip ${showTooltip ? 'show' : 'hidden'}`} ref={setPopperElement} style={styles.popper} {...attributes.popper}>
          <div data-popper-arrow></div>
          <ul style={{ display: 'grid', gap: '.2em', gridTemplateColumns: 'repeat(4, 1fr)' }}>
            {colors.map((color) => {
              return (
                <li
                  key={color}
                  id={color}
                  onClick={onColorChange}
                  style={{
                    backgroundColor: `var(--gnome-${color}2)`,
                    borderRadius: '100%',
                    cursor: 'pointer',
                    listStyle: 'none',
                    padding: '.8em'
                  }}
                />
              )
            })}
          </ul>
        </div>
      </Portal>
    </>
  )
}

export { Task }
