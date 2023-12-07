import { type TaskType } from './Todos'

type Props = TaskType

const Task: React.FC<Props> = ({ completed, id, title }) => {
  return (
    <li className={`task ${completed && 'disabled-task'}`} id={id} >
      <input type="checkbox" name="check" id="check"/>
      <h4>{title.trim()}</h4>
      <div className="icons">
        <i title="Editar tarea" className="fa-solid fa-pen-to-square"></i>
        <i title="Borrar tarea" className="fa-solid fa-trash"></i>
      </div>
  </li>
  )
}

export { Task }
