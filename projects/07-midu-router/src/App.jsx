import { lazy, Suspense } from 'react'
import NotFoundPage from './pages/404.jsx'
import { Route } from './Route.jsx'
import Router from './Router.jsx'

const AboutPage = lazy(() => import('./pages/About.jsx'))
const HomePage = lazy(() => import('./pages/Home.jsx'))
const SearchPage = lazy(() => import('./pages/Search.jsx'))

const appRoutes = [
  {
    Component: SearchPage,
    path: '/search/:query'
  }
]

function App () {
  return (
    <main>
      <Suspense fallback={null}>
        <Router routes={appRoutes} defaultComponent={NotFoundPage}>
          <Route path='/' Component={HomePage} />
          <Route path='/about' Component={AboutPage} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
