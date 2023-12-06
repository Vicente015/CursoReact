import { match } from 'path-to-regexp'
import { Children, useEffect, useState } from 'react'
import { EVENTS } from '../utils/consts'
import { getCurrentPath } from '../utils/getCurrentPath'

export function Router ({ children, defaultComponent: DefaultComponent = () => <h1>404</h1>, routes = [] }) {
  const [currentPath, setCurrentPath] = useState(getCurrentPath())

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(getCurrentPath())
    }

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  let routeParameters = {}

  const routesFromChildren = Children.map(children, ({ props, type }) => {
    const { name } = type
    const isRoute = name === 'Route'
    return isRoute ? props : null
  })

  const routesToUse = routes.concat(routesFromChildren).filter(Boolean)

  const Page = routesToUse.find(({ path }) => {
    if (path === currentPath) return true

    // Usar 'path-to-regexp' para detectar rutas dinámicas y guarda los parámetros
    const matcherURL = match(path, { decode: decodeURIComponent })
    const matched = matcherURL(currentPath)
    if (!matched) return false

    routeParameters = matched.params
    return true
  })?.Component

  return Page
    ? <Page routeParameters={routeParameters} />
    : <DefaultComponent routeParameters={routeParameters} />
}
