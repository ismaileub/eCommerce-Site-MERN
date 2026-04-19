// product.route.ts
import express from "express";
import { ProductController } from "./product.controller";

const router = express.Router();

router.post("/create-product", ProductController.createProduct);
router.get("/all-products", ProductController.getAllProducts);
router.get("/:id", ProductController.getProductById);
router.patch("/:id", ProductController.updateProductById);
router.delete("/:id", ProductController.deleteProductById);

export const ProductRoutes = router;
