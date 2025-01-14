# React-course
Para crear una API REST en **Node.js** con **Express** que implemente autenticación y creación de usuarios usando un archivo JSON como base de datos y siguiendo **principios de Clean Code y Clean Architecture**, organizaremos el proyecto en capas:

---

### **Estructura del proyecto**
```plaintext
/src
  /controllers
    authController.js
  /services
    authService.js
  /repositories
    userRepository.js
  /models
    userModel.js
  /routes
    authRoutes.js
  db.json
app.js
```

### **Objetivos**
1. **Controllers**: Manejan las solicitudes HTTP y respuestas.
2. **Services**: Contienen la lógica del negocio.
3. **Repositories**: Manejan la interacción con el archivo JSON.
4. **Models**: Representan las estructuras de datos.
5. **`db.json`**: Archivo JSON simula la base de datos.

---

### **Desarrollo**

#### Instalar dependencias

```bash
npm init -y
npm install express body-parser bcrypt jsonwebtoken fs-extra dotenv
```

- **express**: Framework para construir APIs.
- **bcrypt**: Manejo de contraseñas cifradas.
- **jsonwebtoken**: Generación y verificación de JWT.
- **fs-extra**: Operaciones con archivos (`db.json`).
- **dotenv**: Configuración de variables de entorno.

---

### **Código**

#### **Archivo `db.json`**
```json
{
  "users": []
}
```

#### **Archivo `app.js`**
```javascript
require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/authRoutes');

const app = express();

// Middlewares
app.use(bodyParser.json());

// Rutas
app.use('/api/auth', authRoutes);

// Puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
```

---

#### **Modelo `/src/models/userModel.js`**
```javascript
class User {
  constructor(email, hashedPassword) {
    this.email = email;
    this.hashedPassword = hashedPassword;
  }
}

module.exports = User;
```

---

#### **Repositorio `/src/repositories/userRepository.js`**
```javascript
const fs = require('fs-extra');
const path = require('path');

const DB_PATH = path.join(__dirname, '../../db.json');

async function getUsers() {
  const data = await fs.readJSON(DB_PATH);
  return data.users;
}

async function saveUsers(users) {
  const data = { users };
  await fs.writeJSON(DB_PATH, data, { spaces: 2 });
}

async function findUserByEmail(email) {
  const users = await getUsers();
  return users.find((user) => user.email === email);
}

async function addUser(user) {
  const users = await getUsers();
  users.push(user);
  await saveUsers(users);
}

module.exports = {
  getUsers,
  findUserByEmail,
  addUser,
};
```

---

#### **Servicio `/src/services/authService.js`**
```javascript
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const userRepository = require('../repositories/userRepository');

const JWT_SECRET = process.env.JWT_SECRET || 'defaultsecret';

async function registerUser(email, password) {
  const existingUser = await userRepository.findUserByEmail(email);
  if (existingUser) {
    throw new Error('El usuario ya existe');
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User(email, hashedPassword);
  await userRepository.addUser(user);
  return { message: 'Usuario registrado exitosamente' };
}

async function authenticateUser(email, password) {
  const user = await userRepository.findUserByEmail(email);
  if (!user) {
    throw new Error('Credenciales inválidas');
  }
  const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
  if (!isPasswordValid) {
    throw new Error('Credenciales inválidas');
  }
  const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: '1h' });
  return { token, message: 'Autenticación exitosa' };
}

module.exports = {
  registerUser,
  authenticateUser,
};
```

---

#### **Controlador `/src/controllers/authController.js`**
```javascript
const authService = require('../services/authService');

async function register(req, res) {
  try {
    const { email, password } = req.body;
    const response = await authService.registerUser(email, password);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const response = await authService.authenticateUser(email, password);
    res.status(200).json(response);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
}

module.exports = {
  register,
  login,
};
```

---

#### **Rutas `/src/routes/authRoutes.js`**
```javascript
const express = require('express');
const authController = require('../controllers/authController');

const router = express.Router();

// Rutas de autenticación
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
```

---

### **Uso**
1. Levanta el servidor:
   ```bash
   node app.js
   ```
2. Realiza llamadas a la API:
   - **Registro** (`POST /api/auth/register`):
     ```json
     {
       "email": "usuario@ejemplo.com",
       "password": "contrasena123"
     }
     ```
   - **Login** (`POST /api/auth/login`):
     ```json
     {
       "email": "usuario@ejemplo.com",
       "password": "contrasena123"
     }
     ```

---

### **Extensiones**
1. Agregar validaciones con **`express-validator`**.
2. Implementar tests unitarios con **Jest**.
3. Migrar la "base de datos" a MongoDB o PostgreSQL.

**¿Te gustaría agregar algún test o alguna funcionalidad adicional?** 😊
