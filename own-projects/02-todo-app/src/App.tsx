import './index.css'
import { Filters } from './components/Filters'
import { Header } from './components/Header'
import { NewTask, TasksList } from './components/index'
import { TasksProvider } from './context/TasksContext'
import { useFilters } from './hooks/useFilters'

const App: React.FC = () => {
  const { changeFilter, filter, filterTasks } = useFilters()

  return (
    <TasksProvider>
      <Header/>
      <main>
        <NewTask/>
        <Filters changeFilter={changeFilter} filter={filter} />
        <TasksList filterTasks={filterTasks} />
      </main>
    </TasksProvider>
  )
}

export default App
