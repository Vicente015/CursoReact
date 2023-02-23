import './App.css'
import { useEffect, useState } from 'react'

const FollowMouse = () => {
  const [enabled, setEnabled] = useState(false)
  const [position, setPosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    console.debug('efecto', enabled)

    const handleMove = (event) => {
      const { clientX, clientY } = event
      setPosition({ x: clientX, y: clientY })
    }

    if (enabled) {
      window.addEventListener('pointermove', handleMove)
    }

    // Limpieza de efecto?
    // Se ejecuta solo cuando se desmonte el componente o actualice dependencias
    return () => {
      console.debug('cleanup')
      window.removeEventListener('pointermove', handleMove)
    }
  }, [enabled])

  return (
    <>
      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        border: '1px solid #fff',
        borderRadius: '50%',
        height: 50,
        left: -25,
        opacity: 0.8,
        pointerEvents: 'none',
        position: 'absolute',
        top: -25,
        transform: `translate(${position.x}px, ${position.y}px)`,
        width: 50
      }}
      />

      <button onClick={() => setEnabled(!enabled)}>
        {enabled ? 'Desactivar' : 'Activar'} seguir puntero
      </button>
    </>
  )
}

function App () {
  return (
    <main>
      <h3>Proyecto 3</h3>
      <FollowMouse />
    </main>
  )
}

export default App
