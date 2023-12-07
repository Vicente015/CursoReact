import { type ChangeEvent, useState } from 'react'
import { useTasksDispatch } from '../context/TasksContext'

const NewTask: React.FC = () => {
  const [text, setText] = useState('')
  const dispatch = useTasksDispatch()

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setText(event.target.value.trim())
  }

  // todo: está deprecado, mirar alternativa
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      dispatch({
        payload: { text },
        type: 'add'
      })
      setText('')
    }
  }

  return (
    <section className="new-task">
      <div className="input">
        <small className="hidden">Nueva tarea</small>
        <input
          type="text"
          id="new_task"
          value={text}
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          placeholder="Escriba una tarea nueva"
        />
      </div>
      <i className="fa-solid fa-pencil"></i>
    </section>
  )
}

export { NewTask }
