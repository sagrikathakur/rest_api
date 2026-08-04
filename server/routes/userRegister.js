import express from 'express';
import { registerUserController, getAllUserController } from '../controller/userRegister.js';

const router = express.Router();

router.post('/register', registerUserController);
router.get('/users', getAllUserController);

export default router;
