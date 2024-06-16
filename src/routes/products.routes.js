import { Router } from 'express';
import { getProducts, createProduct , deleteProduct, updateProduct, getProductById} from "../controllers/products.controller.js";

const router = Router();
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', createProduct);
router.delete('/products/:id', deleteProduct);
router.put('/products/:id', updateProduct);

export default router;