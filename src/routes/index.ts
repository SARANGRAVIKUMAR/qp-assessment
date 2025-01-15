import { Router } from 'express';
import healthRouter from './health.routes';
import userRouter from './user.routes';
import groceryRouter from './grocery.routes';

const router = Router();

// Health check route
router.use('/health', healthRouter);

// User routes
router.use('/users', userRouter);

router.use('/grocery', groceryRouter);


export default router;
export { router as routes };
