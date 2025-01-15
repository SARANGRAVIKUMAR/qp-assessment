import { Router } from "express";
import { authenticate, isAdmin } from "../middleware/auth.middleware";
import { getAllGroceries, createGrocery, getGroceryById, updateGrocery, deleteGrocery } from "../controllers/GroceryController";

const router = Router();

// Admin routes
router.post('/', authenticate, isAdmin, createGrocery);
router.put('/:id',  authenticate, isAdmin, updateGrocery);
router.delete('/:id',  authenticate, isAdmin, deleteGrocery);

// Common routes
router.get('/', authenticate, getAllGroceries);
router.get('/:id', authenticate, getGroceryById);


export default router;