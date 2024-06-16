import { Router } from 'express';
import { login, getUsers } from '../controllers/users.controller.js'; 

const router = Router();

router.post('/login', login);
router.get('/users', getUsers);

export default router;