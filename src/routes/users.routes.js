import { Router } from 'express';
import { login, getUsers, signUp } from '../controllers/users.controller.js'; 

const router = Router();

router.post('/login', login);
router.get('/users', getUsers);
router.post('/signup', signUp);

export default router;