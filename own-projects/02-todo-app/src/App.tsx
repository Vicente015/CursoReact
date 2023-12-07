import './index.css'
import { NewTask, TasksList } from './components/index'
import { TasksProvider } from './context/TasksContext'

const App: React.FC = () => {
  return (
    <TasksProvider>
      <main>
      <section>
        <h1>📑 Lista de tareas</h1>
      </section>

      <NewTask></NewTask>
      <TasksList></TasksList>
      </main>
    </TasksProvider>
  )
}

export default App
