import { pool } from "../db.js";

export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const query = 'SELECT * FROM users WHERE name = ? AND password = ?';
        const [rows] = await pool.query(query, [username, password]);

        if (rows.length > 0) {
            const user = rows[0];
            if (user.password === password) {
                console.log(`User ID: ${user.iduser}, Username: ${user.name}`);
                console.log(rows);
                res.json({ success: true, rows });
            } else {
                res.json({ success: false, message: 'Usuario o contraseña incorrectos' });
            }
        } else {
            res.json({ success: false, message: 'Usuario o contraseña incorrectos' });
        }
    } catch (error) {
        console.error('Error en la base de datos:', error);
        res.status(500).json({ success: false, message: 'Error en la base de datos' });
    }
};

export const getUsers = async (req, res) => {
    try {
        const query = 'SELECT * FROM users';
        const [rows] = await pool.query(query);

        res.json({ success: true, users: rows });
    } catch (error) {
        console.error('Error en la base de datos:', error);
        res.status(500).json({ success: false, message: 'Error en la base de datos' });
    }
};

export const signUp = async (req, res) => {
    const { name, password, admin } = req.body;
    try {
      const [result] = await pool.query('INSERT INTO users (name, password, admin) VALUES (?, ?, ?)', [name, password, admin]);
      res.status(201).json({ id: result.insertId, name });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error registering user');
    }
  };

  export const getUsersByName = async (req, res) => {
    const { name } = req.params;
    try {
      const [rows] = await pool.query('SELECT * FROM users WHERE name = ?', [name]);
      res.json(rows);
    } catch (error) {
      console.error('Error retrieving users by name:', error);
      res.status(500).send('Error retrieving users');
    }
  };

// export const signUp = async (req, res) => {
//     const { name, password, admin } = req.body;
  
//     try {
//       // Verificar si el usuario ya existe
//       const [existingUsers] = await pool.query('SELECT * FROM users WHERE name = ?', [name]);
  
//       if (existingUsers.length > 0) {
//         return res.status(400).json({ message: 'Username already exists' });
//       }
  
//       // Insertar el nuevo usuario
//       const [result] = await pool.query('INSERT INTO users (name, password, admin) VALUES (?, ?)', [name, password, admin]);
  
//       res.json({ id: result.insertId, name, password });
//     } catch (error) {
//       console.error(error);
//       res.status(500).send('Error creating user');
//     }
//   };