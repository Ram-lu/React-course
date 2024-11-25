import { useState, useEffect } from 'react'

const Crud = () => {
  const [productos, setProductos] = useState([])
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', precio: '' })
  const [editarProducto, setEditarProducto] = useState(null)

  useEffect(() => {
    fetch('http://localhost:3000/productos')
      .then(response => response.json())
      .then(data => setProductos(data))
      .catch(error => console.error('Error al obtener productos:', error))
  }, [])

  const crearProducto = () => {
    fetch('http://localhost:3000/productos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoProducto)
    })
      .then(response => response.json())
      .then(data => {
        setProductos([...productos, data])
        setNuevoProducto({ nombre: '', precio: '' })
      })
      .catch(error => console.error('Error al crear producto:', error))
  }

  const actualizarProducto = (id) => {
    fetch(`http://localhost:3000/productos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editarProducto)
    })
      .then(response => response.json())
      .then(data => {
        setProductos(productos.map(p => (p.id === id ? data : p)))
        setEditarProducto(null)
      })
      .catch(error => console.error('Error al actualizar producto:', error))
  }

  const eliminarProducto = (id) => {
    fetch(`http://localhost:3000/productos/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        setProductos(productos.filter(p => p.id !== id))
      })
      .catch(error => console.error('Error al eliminar producto:', error))
  }

  return (
    <div>
      <h1>CRUD de Productos</h1>
      <div>
        <h2>Crear Producto</h2>
        <input
          type='text'
          placeholder='Nombre'
          value={nuevoProducto.nombre}
          onChange={e => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
        />
        <input
          type='number'
          placeholder='Precio'
          value={nuevoProducto.precio}
          onChange={e => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
        />
        <button onClick={crearProducto}>Crear</button>
      </div>

      <div>
        <h2>Lista de Productos</h2>
        <ul>
          {productos.map(producto => (
            <li key={producto.id}>
              {producto.nombre} - ${producto.precio}
              <button onClick={() => setEditarProducto(producto)}>Editar</button>
              <button onClick={() => eliminarProducto(producto.id)}>Eliminar</button>
            </li>
          ))}
        </ul>
      </div>

      {editarProducto && (
        <div>
          <h2>Editar Producto</h2>
          <input
            type='text'
            placeholder='Nombre'
            value={editarProducto.nombre}
            onChange={e => setEditarProducto({ ...editarProducto, nombre: e.target.value })}
          />
          <input
            type='number'
            placeholder='Precio'
            value={editarProducto.precio}
            onChange={e => setEditarProducto({ ...editarProducto, precio: e.target.value })}
          />
          <button onClick={() => actualizarProducto(editarProducto.id)}>Actualizar</button>
        </div>
      )}
    </div>
  )
}

export default Crud
