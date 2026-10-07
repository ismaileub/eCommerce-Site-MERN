"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
// product.route.ts
const express_1 = __importDefault(require("express"));
const checkAuth_1 = require("../../middlewares/checkAuth");
const user_interface_1 = require("../user/user.interface");
const product_controller_1 = require("./product.controller");
const router = express_1.default.Router();
router.post("/create-product", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), product_controller_1.ProductController.createProduct);
router.get("/all-products", product_controller_1.ProductController.getAllProducts);
router.get("/:id", product_controller_1.ProductController.getProductById);
router.patch("/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), product_controller_1.ProductController.updateProductById);
router.delete("/:id", (0, checkAuth_1.checkAuth)(user_interface_1.Role.ADMIN, user_interface_1.Role.SUPER_ADMIN), product_controller_1.ProductController.deleteProductById);
exports.ProductRoutes = router;
