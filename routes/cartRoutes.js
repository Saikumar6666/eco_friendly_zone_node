import express from "express";
import { addItem, getCart, removeItem,getCartItemsByUser, updateQuantity } from "../controllers/cartController.js";

const router = express.Router();

router.post("/add", addItem);
router.get("/:userId", getCart);
router.delete("/remove/:cartId", removeItem);
router.get('/:userId', getCartItemsByUser);
router.put('/update/:id', updateQuantity);

export default router;
