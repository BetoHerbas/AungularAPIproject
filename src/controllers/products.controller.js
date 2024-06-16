import { pool } from "../db.js"

export const getProducts = async(req, res) => {

    const result = await pool.query('SELECT * FROM products');
    console.log(result[0]);
    res.send(result[0]);
}

export const createProduct = async (req, res) => {
    const { title, price, description, category, image } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO products (title, price, description, category, image) VALUES (?, ?, ?, ?, ?)',
        [title, price, description, category, image]
      );
      const newProduct = {
        id: result.insertId,
        title,
        price,
        description,
        category,
        image,
      };
      res.status(201).json(newProduct);
    } catch (error) {
      console.error('Error creating product:', error);
      res.status(500).send('Server error');
    }
  };