Aquí tienes el ejercicio actualizado con los siguientes cambios:

1. **`db.json`** movido a la carpeta `/database`.  
2. Archivo **`.env`** implementado dentro de una carpeta `/config`.  
3. Actualizaciones correspondientes para reflejar estas mejoras.

### **Estructura del proyecto**
```plaintext
/config
  .env
/database
  db.json
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
app.js
.gitignore
```

---

### **Archivos del Proyecto**

#### **Archivo `/config/.env`**
```plaintext
PORT=3000
JWT_SECRET=mi_secreto_super_seguro
```

---

#### **Archivo `/database/db.json`**
```json
{
  "users": []
}
```

---

#### **Archivo `/app.js`**
```javascript
require('dotenv').config({ path: './config/.env' }); // Cargar .env desde config
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

// Ruta actualizada del archivo db.json
const DB_PATH = path.join(__dirname, '../../database/db.json');

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

// Obtener secreto JWT desde .env
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

#### **Archivo `.gitignore`**
```plaintext
# Ignorar node_modules y config privado
node_modules/
config/.env
```

---

### **Ejecución**
1. **Instalar dependencias**:
   ```bash
   npm install
   ```

2. **Crear archivo `.env` en la carpeta `config`**:
   Asegúrate de que contenga el **`JWT_SECRET`** y el **`PORT`** definidos anteriormente.

3. **Iniciar el servidor**:
   ```bash
   node app.js
   ```

---

### **Pruebas**
- **Registro (`POST /api/auth/register`)**:
  ```json
  {
    "email": "test@example.com",
    "password": "mypassword123"
  }
  ```
- **Inicio de sesión (`POST /api/auth/login`)**:
  ```json
  {
    "email": "test@example.com",
    "password": "mypassword123"
  }
  ```

---

### **Mejoras sugeridas**
1. **Agregar validaciones de entrada** con **`express-validator`**.
2. **Implementar tests unitarios** para garantizar el funcionamiento de las capas individuales.

¿Te gustaría que incluya más validaciones o ejemplos de tests automatizados? 😊
