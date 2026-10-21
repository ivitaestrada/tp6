import { useState } from 'react'
import './App.css'
import './Blobs.css'

function App() {
  const [blob, setBlob] = useState(null)
  const [mensaje, setMensaje] = useState('')

  const crearBlob = () => {
    const texto = 'Hola! Este es un archivo de texto creado con un Blob desde React.'
    const nuevoBlob = new Blob([texto], { type: 'text/plain' })
    setBlob(nuevoBlob)
    setMensaje(`Blob creado. Tamaño: ${nuevoBlob.size} bytes. Tipo: ${nuevoBlob.type}`)
  }

  const descargarBlob = () => {
    if (!blob) {
      setMensaje('Primero debe crear el Blob.')
      return
    }

    const url = URL.createObjectURL(blob)
    const enlace = document.createElement('a')
    enlace.href = url
    enlace.download = 'archivo.txt'
    document.body.appendChild(enlace)
    enlace.click()
    document.body.removeChild(enlace)
    URL.revokeObjectURL(url)
    setMensaje('Archivo descargado correctamente.')
  }

  const usarSlice = async () => {
    if (!blob) {
      setMensaje('Primero debe crear el Blob.')
      return
    }

    const parte = blob.slice(0, 20, 'text/plain')
    const contenido = await parte.text()
    setMensaje(`slice(0, 20): "${contenido}"`)
  }

  return (
    <main className="contenido">
      <div className="blobs">
        <h2>Ejemplo de uso de Blobs</h2>

        <div className="blobs-botones">
          <button onClick={crearBlob}>Crear Blob de texto</button>
          <button onClick={descargarBlob}>Descargar Blob</button>
          <button onClick={usarSlice}>Usar slice()</button>
        </div>

        {mensaje && <p className="blobs-mensaje">{mensaje}</p>}
      </div>
    </main>
  )
}

export default App