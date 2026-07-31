import express from 'express';
import { userRegisterController, checkEmailController } from '../controller/userRegister.js';

const router = express.Router();

// Routes for user registration & email check
router.post('/register', userRegisterController);
router.post('/check-email', checkEmailController);
router.post('/', userRegisterController);

export default router;

