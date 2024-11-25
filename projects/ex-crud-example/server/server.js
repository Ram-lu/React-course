const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')

app.use(express.json())
app.use(cors())

const productos = [
  { id: 1, nombre: 'Producto A', precio: 100 },
  { id: 2, nombre: 'Producto B', precio: 200 }
]

// Obtener todos los productos
app.get('/productos', (req, res) => {
  res.json(productos)
})

// Obtener un producto por ID
app.get('/productos/:id', (req, res) => {
  const producto = productos.find(p => p.id === parseInt(req.params.id))
  if (!producto) return res.status(404).send('Producto no encontrado')
  res.json(producto)
})

// Crear un nuevo producto
app.post('/productos', (req, res) => {
  const producto = {
    id: productos.length + 1,
    nombre: req.body.nombre,
    precio: req.body.precio
  }
  productos.push(producto)
  res.status(201).json(producto)
})

// Actualizar un producto existente
app.put('/productos/:id', (req, res) => {
  const producto = productos.find(p => p.id === parseInt(req.params.id))
  if (!producto) return res.status(404).send('Producto no encontrado')

  producto.nombre = req.body.nombre
  producto.precio = req.body.precio
  res.json(producto)
})

// Eliminar un producto
app.delete('/productos/:id', (req, res) => {
  const productoIndex = productos.findIndex(p => p.id === parseInt(req.params.id))
  if (productoIndex === -1) return res.status(404).send('Producto no encontrado')

  productos.splice(productoIndex, 1)
  res.status(204).send()
})

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`)
})
