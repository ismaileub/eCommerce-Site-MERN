"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const product_model_1 = require("../product/product.model");
const cart_model_1 = require("./cart.model");
const addItemToCart = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { userId, productId } = payload;
    const quantityToAdd = (_a = payload.quantity) !== null && _a !== void 0 ? _a : 1;
    if (!mongoose_1.default.Types.ObjectId.isValid(userId)) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Invalid user id");
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(productId)) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Invalid product id");
    }
    const product = yield product_model_1.ProductModel.findById(productId);
    if (!product) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Product not found");
    }
    if (product.stock <= 0) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, "Product is out of stock");
    }
    const existing = yield cart_model_1.CartItemModel.findOne({
        user: new mongoose_1.default.Types.ObjectId(userId),
        product: new mongoose_1.default.Types.ObjectId(productId),
    });
    const nextQuantity = ((_b = existing === null || existing === void 0 ? void 0 : existing.quantity) !== null && _b !== void 0 ? _b : 0) + quantityToAdd;
    if (nextQuantity > product.stock) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, `Only ${product.stock} item(s) available in stock`);
    }
    const saved = yield cart_model_1.CartItemModel.findOneAndUpdate({ user: userId, product: productId }, { $set: { user: userId, product: productId, quantity: nextQuantity } }, { new: true, upsert: true, runValidators: true }).populate("product");
    return saved;
});
const getMyCart = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield cart_model_1.CartItemModel.find({ user: userId })
        .populate("product")
        .sort({ updatedAt: -1 });
    const totalQuantity = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
    return {
        items,
        totalQuantity,
    };
});
const updateCartItemQuantity = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, itemId, quantity } = payload;
    const item = yield cart_model_1.CartItemModel.findOne({ _id: itemId, user: userId });
    if (!item) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Cart item not found");
    }
    const product = yield product_model_1.ProductModel.findById(item.product);
    if (!product) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Product not found");
    }
    if (quantity > product.stock) {
        throw new AppError_1.default(http_status_codes_1.default.BAD_REQUEST, `Only ${product.stock} item(s) available in stock`);
    }
    item.quantity = quantity;
    yield item.save();
    return cart_model_1.CartItemModel.findById(item._id).populate("product");
});
const removeCartItem = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { userId, itemId } = payload;
    const deleted = yield cart_model_1.CartItemModel.findOneAndDelete({
        _id: itemId,
        user: userId,
    });
    if (!deleted) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Cart item not found");
    }
    return deleted;
});
exports.CartServices = {
    addItemToCart,
    getMyCart,
    updateCartItemQuantity,
    removeCartItem,
};
