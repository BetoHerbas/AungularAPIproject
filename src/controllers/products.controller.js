import { pool } from "../db.js"

export const getProducts = async(req, res) => {

    const result = await pool.query('SELECT * FROM products');
    console.log(result[0]);
    res.send(result[0]);
}

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
      const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
      if (rows.length === 0) {
          return res.status(404).json({ message: "Product not found" });
      }
      res.json(rows[0]);
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to retrieve product" });
  }
};

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

  export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    try {
      await pool.query('DELETE FROM products WHERE id = ?', [id]);
      res.status(204).send(); // No Content
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).send('Server error');
    }
  };

  export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title, price, description, category, image } = req.body;

    try {
        const [result] = await pool.query('UPDATE products SET title = ?, price = ?, description = ?, category = ?, image = ? WHERE id = ?', [title, price, description, category, image, id]);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Product not found" });
        }

        const [updatedProduct] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
        res.json(updatedProduct[0]);
    } catch (error) {
        res.status(500).json({ message: "Failed to update product" });
    }
};
