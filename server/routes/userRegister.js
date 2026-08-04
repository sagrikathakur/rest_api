import express from 'express';
import { registerUserController, getAllUserController } from '../controller/userRegister.js';
import { validate } from '../middlewares/validate.js';
import { registerSchema } from '../validations/userRegisterValidate.js';

const router = express.Router();

router.post('/register', validate(registerSchema), registerUserController);
router.get('/users', getAllUserController);

export default router;

