import { Router } from 'express';
import healthRouter from './health.routes';
import userRouter from './user.routes';

const router = Router();

// Health check route
router.use('/health', healthRouter);

// User routes
router.use('/users', userRouter);

export default router;
export { router as routes };
