import { Router } from "express";
import { authenticate, isAdmin } from "../middleware/auth.middleware";
import { getAllGroceries, createGrocery, getGroceryById, updateGrocery, deleteGrocery } from "../controllers/GroceryController";
import { createOrder, getOrderHistory } from "../controllers/OrderController";

const router = Router();

router.post('/create-order', authenticate, createOrder);
router.get('/order-history', authenticate, getOrderHistory);


export default router;