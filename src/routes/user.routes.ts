import { Router } from 'express';
import * as UserController from '../controllers/UserController';
import { authenticate, isAdmin } from '../middleware/auth.middleware';

const router = Router();

// Admin routes
router.post('/admin-user', authenticate, isAdmin, UserController.createAdminUser);

// Public routes
router.post('/sign-up', UserController.signUp);
router.post('/login', UserController.login);

export default router;
