import { Task } from './Task'

interface TaskType {
  id: string
  title: string
  completed: boolean
}

interface Props { tasks: TaskType[] }

const TasksList: React.FC<Props> = ({ tasks }) => {
  return (
    <ul className="tasks-list">
      {tasks.map((task) => (
        <Task key={task.id} {...task}></Task>
      ))}
    </ul>
  )
}

export { TasksList, type TaskType }
