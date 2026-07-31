import express from 'express';
import { userRegisterController } from '../controller/userRegister.js';

const router = express.Router();

// Route for user registration
router.post('/register', userRegisterController);
router.post('/', userRegisterController);

export default router;

