import express from 'express';
import {
  createUserController,
  getUserController,
  getUserByIdController,
  updateUserController,
  deleteUserController,
  searchUserController,
} from '../controller/product.controller.js';

const router = express.Router();

// User routes
router.post('/', createUserController);
router.get('/', getUserController);
router.get('/search/:name', searchUserController);
router.get('/:id', getUserByIdController);
router.put('/:id', updateUserController);
router.delete('/:id', deleteUserController);

export default router;
