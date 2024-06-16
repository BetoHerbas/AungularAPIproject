import { pool } from "../db.js"

export const getBuyCartByUserId = async (req, res) => {
  const userId = req.params.userId;
  try {
    const [rows] = await pool.query(
      `SELECT bc.idCart AS id, bc.quantity, 
              p.id AS 'product.id', p.title AS 'product.title', p.price AS 'product.price', 
              p.description AS 'product.description', p.image AS 'product.image' 
       FROM buycart bc 
       JOIN products p ON bc.idProduct = p.id 
       WHERE bc.idUser = ?`,
      [userId]
    );
    const cartItems = rows.map(row => ({
      id: row.id,
      quantity: row.quantity,
      product: {
        id: row['product.id'],
        title: row['product.title'],
        price: row['product.price'],
        description: row['product.description'],
        image: row['product.image']
      }
    }));
    res.json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving buy cart items');
  }
};

export const addProductToCart = async (req, res) => {
    const { userId, productId, quantity } = req.body;
    try {
      const [result] = await pool.query(
        'INSERT INTO buycart (idUser, idProduct, quantity) VALUES (?, ?, ?)',
        [userId, productId, quantity]
      );
  
      res.status(201).json({
        message: 'Product added to cart successfully',
        id: result.insertId
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to add product to cart' });
    }
  };

  export const deleteFromCart = async (req, res) => {
    const cartId = req.params.cartId;
    try {
      const [result] = await pool.query(
        `DELETE FROM buycart WHERE idCart = ?`,
        [cartId]
      );
      if (result.affectedRows > 0) {
        res.status(200).send('Product removed from cart successfully');
      } else {
        res.status(404).send('Product not found in cart');
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Error removing product from cart');
    }
  };  