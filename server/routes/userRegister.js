import express from 'express';
import { 
  registerUserController, 
  loginUserController, 
  getMeController, 
  getAllUserController 
} from '../controller/userRegister.js';
import { validate } from '../middlewares/validate.js';
import { registerSchema } from '../validations/userRegisterValidate.js';
import { loginSchema } from '../validations/userLoginValidate.js';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Authentication Routes
router.post('/register', validate(registerSchema), registerUserController);
router.post('/login', validate(loginSchema), loginUserController);

// Protected User Route (Requires Bearer JWT token header)
router.get('/me', verifyToken, getMeController);

// Utility route
router.get('/users', getAllUserController);

export default router;