// product.route.ts
import express from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../user/user.interface";
import { ProductController } from "./product.controller";

const router = express.Router();

router.post(
  "/create-product",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  ProductController.createProduct,
);
router.get("/all-products", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.patch(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  ProductController.updateProductById,
);
router.delete(
  "/:id",
  checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
  ProductController.deleteProductById,
);

export const ProductRoutes = router;
