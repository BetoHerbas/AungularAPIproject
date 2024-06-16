import { Router } from 'express';
import { getBuyCartByUserId, addProductToCart, deleteFromCart } from "../controllers/buycart.controller.js";

const router = Router();
router.get('/buycart/:userId', getBuyCartByUserId);
router.post('/buycart', addProductToCart);
router.delete('/buycart/:cartId', deleteFromCart);

export default router;