import { Router } from 'express';
import * as UserController from '../controllers/UserController';

const router = Router();

// Create a new user
router.post('/', UserController.createUser);

// Get all users
router.get('/', UserController.getAllUsers);

// Update a user
router.put('/:id', UserController.updateUser);

// Delete a user
router.delete('/:id', UserController.deleteUser);

export default router;
