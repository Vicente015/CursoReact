import './index.css'
import { NewTask, TasksList } from './components/index'
import { TasksProvider } from './context/TasksContext'

const App: React.FC = () => {
  // todo: Contador de tareas completadas
  // todo: Filtros Todas / Completadas / No completadas
  // done: Sacar tipos a un fichero aparte
  // done: Soportar colores con la paleta de GNOME
  // todo: Soportar Dark Mode
  return (
    <TasksProvider>
      <main>
        <section>
          <h1>📑 Lista de tareas</h1>
        </section>

        <NewTask />
        <TasksList/>
      </main>
    </TasksProvider>
  )
}

export default App
