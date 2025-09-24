import express from "express";
import { CartControllers } from "./cart.controller";

const router = express.Router();

router.post('/create-cart', CartControllers.createCart);

router.get('/', CartControllers.getAllCarts);

router.get('/:cartId', CartControllers.getSingleCart);

router.delete("/:cartId", CartControllers.deleteCart)

export const CartRouters = router;