import { useTasks } from '../context/TasksContext'
import { Task } from './Task'

const TasksList: React.FC = () => {
  const tasks = useTasks()

  return (
    <ul className="tasks-list">
      {tasks.map((task) => (
        <Task key={task.id} {...task}></Task>
      ))}
    </ul>
  )
}

export { TasksList }
