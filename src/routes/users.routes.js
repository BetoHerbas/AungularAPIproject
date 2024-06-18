import { Router } from 'express';
import { login, getUsers, signUp, getUsersByName } from '../controllers/users.controller.js'; 

const router = Router();

router.post('/login', login);
router.get('/users', getUsers);
router.post('/signup', signUp);
router.get('/users/:name', getUsersByName);

export default router;