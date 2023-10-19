const express = require('express');
const mysql = require('mysql2/promise'); // Para trabajar con MySQL
const app = express();

const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: '',
  database: 'seguritl',
};

// Middleware para el uso de JSON en las peticiones
app.use(express.json());

// Ruta para obtener todos los usuarios
app.get('/usuarios', async (req, res) => {
  const connection = await mysql.createConnection(dbConfig);

  try {
    const [rows] = await connection.execute('SELECT * FROM Usuarios');
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  } finally {
    connection.end();
  }
});
// Ruta para crear un nuevo usuario (POST)
app.post('/usuarios', async (req, res) => {
    const connection = await mysql.createConnection(dbConfig);
    const { Nombre, Apellido, Sexo, Foto, Contraseña, Rol, Telefono } = req.body;
  
    try {
      await connection.execute(
        'INSERT INTO Usuarios (Nombre, Apellido, Sexo, Foto, Contraseña, Rol, Telefono) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [Nombre, Apellido, Sexo, Foto, Contraseña, Rol, Telefono]
      );
      res.json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al crear un usuario' });
    } finally {
      connection.end();
    }
  });
  
  // Ruta para actualizar un usuario por ID (PUT)
  app.put('/usuarios/:id', async (req, res) => {
    const connection = await mysql.createConnection(dbConfig);
    const { Nombre, Apellido, Sexo, Foto, Contraseña, Rol, Telefono } = req.body;
    const usuarioId = req.params.id;
  
    try {
      await connection.execute(
        'UPDATE Usuarios SET Nombre = ?, Apellido = ?, Sexo = ?, Foto = ?, Contraseña = ?, Rol = ?, Telefono = ? WHERE ID = ?',
        [Nombre, Apellido, Sexo, Foto, Contraseña, Rol, Telefono, usuarioId]
      );
      res.json({ message: 'Usuario actualizado exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al actualizar un usuario' });
    } finally {
      connection.end();
    }
  });
  
  // Ruta para eliminar un usuario por ID (DELETE)
  app.delete('/usuarios/:id', async (req, res) => {
    const connection = await mysql.createConnection(dbConfig);
    const usuarioId = req.params.id;
  
    try {
      await connection.execute('DELETE FROM Usuarios WHERE ID = ?', [usuarioId]);
      res.json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al eliminar un usuario' });
    } finally {
      connection.end();
    }
  });
  


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});
