import { useEffect, useState } from 'react'

export function App () {
  const [enabled, setEnabled] = useState(false)

  const handleClick = () => {
    return enabled ? setEnabled(false) : setEnabled(true)
  }

  useEffect(() => {
    console.log('efecto')
    const handleMove = (event) => {
      const { clientX, clientY } = event
      console.log('handle move at:', { clientX, clientY })
    }

    if (enabled) window.addEventListener('pointermove', handleMove)

    return () => window.removeEventListener('pointermove', handleMove)
  }, [enabled])

  return (
    <main>
      <div style={{
        position: 'absolute',
        backgroundColor: '#09f',
        borderRadius: '50%',
        opacity: 0.8,
        pointerEvents: 'none',
        left: -20,
        top: -20,
        width: 40,
        height: 40,
        transform: 'translate(0px, 0px)'
      }}
      />
      <button onClick={handleClick}>
        {`${enabled ? 'Desactivar' : 'Activar'} seguir puntero`}
      </button>
    </main>
  )
}
