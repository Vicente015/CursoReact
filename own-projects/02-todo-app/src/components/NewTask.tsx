import { type ChangeEvent, useState } from 'react'

interface Props {
  onTaskAdd: (text: string) => void
}

const NewTask: React.FC<Props> = ({ onTaskAdd }) => {
  const [text, setText] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setText(event.target.value)
  }

  // todo: está deprecado, mirar alternativa
  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>): void => {
    if (event.key === 'Enter') {
      onTaskAdd(text)
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
