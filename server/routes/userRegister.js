import express from 'express';
import { registerUserController } from '../controller/userRegister.js';

const router = express.Router();

router.post('/register', registerUserController);

export default router;