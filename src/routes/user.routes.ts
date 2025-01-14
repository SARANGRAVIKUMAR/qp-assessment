import { Router } from 'express';
import * as UserController from '../controllers/UserController';
import { authenticate, isAdmin } from '../middleware/auth.middleware';

const router = Router();

// Admin routes
router.post('/admin-user', authenticate, isAdmin, UserController.createAdminUser);

// Public routes
router.post('/sign-up', UserController.signUp);
router.post('/login', UserController.login);

// Protected routes
router.get('/users', authenticate, UserController.getAllUsers);
router.put('/users/:id', authenticate, UserController.updateUser);
router.delete('/users/:id', authenticate, UserController.deleteUser);

export default router;
