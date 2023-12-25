import { useTasks } from '../context/TasksContext'
import { type useFilters } from '../hooks/useFilters'
import { Task } from './Task'

interface Props {
  filterTasks: ReturnType<typeof useFilters>['filterTasks']
}

const TasksList: React.FC<Props> = ({ filterTasks }) => {
  const tasks = useTasks()
  const filteredTasks = filterTasks(tasks)

  return (
    <ul className="tasks-list">
      {filteredTasks.map((task) => (
        <Task key={task.id} {...task}></Task>
      ))}
    </ul>
  )
}

export { TasksList }
