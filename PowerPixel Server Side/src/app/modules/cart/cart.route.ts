import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../user/user.interface";
import { CartControllers } from "./cart.controller";
import { CartValidations } from "./cart.validation";

const router = Router();

router.get("/", checkAuth(...Object.values(Role)), CartControllers.getMyCart);

router.post(
  "/items",
  checkAuth(...Object.values(Role)),
  validateRequest(CartValidations.addItem),
  CartControllers.addItem,
);

router.patch(
  "/items/:itemId",
  checkAuth(...Object.values(Role)),
  validateRequest(CartValidations.updateQuantity),
  CartControllers.updateQuantity,
);

router.delete(
  "/items/:itemId",
  checkAuth(...Object.values(Role)),
  CartControllers.removeItem,
);

export const CartRoutes = router;
