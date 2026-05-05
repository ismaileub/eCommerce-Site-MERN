import mongoose from "mongoose";
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { ProductModel } from "../product/product.model";
import { CartItemModel } from "./cart.model";

const addItemToCart = async (payload: {
  userId: string;
  productId: string;
  quantity?: number;
}) => {
  const { userId, productId } = payload;
  const quantityToAdd = payload.quantity ?? 1;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid user id");
  }
  if (!mongoose.Types.ObjectId.isValid(productId)) {
    throw new AppError(httpStatus.BAD_REQUEST, "Invalid product id");
  }

  const product = await ProductModel.findById(productId);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }
  if (product.stock <= 0) {
    throw new AppError(httpStatus.BAD_REQUEST, "Product is out of stock");
  }

  const existing = await CartItemModel.findOne({
    user: new mongoose.Types.ObjectId(userId),
    product: new mongoose.Types.ObjectId(productId),
  });

  const nextQuantity = (existing?.quantity ?? 0) + quantityToAdd;

  if (nextQuantity > product.stock) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Only ${product.stock} item(s) available in stock`,
    );
  }

  const saved = await CartItemModel.findOneAndUpdate(
    { user: userId, product: productId },
    { $set: { user: userId, product: productId, quantity: nextQuantity } },
    { new: true, upsert: true, runValidators: true },
  ).populate("product");

  return saved;
};

const getMyCart = async (userId: string) => {
  const items = await CartItemModel.find({ user: userId })
    .populate("product")
    .sort({ updatedAt: -1 });

  const totalQuantity = items.reduce(
    (sum, item) => sum + (item.quantity || 0),
    0,
  );

  return {
    items,
    totalQuantity,
  };
};

const updateCartItemQuantity = async (payload: {
  userId: string;
  itemId: string;
  quantity: number;
}) => {
  const { userId, itemId, quantity } = payload;

  const item = await CartItemModel.findOne({ _id: itemId, user: userId });
  if (!item) {
    throw new AppError(httpStatus.NOT_FOUND, "Cart item not found");
  }

  const product = await ProductModel.findById(item.product);
  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product not found");
  }

  if (quantity > product.stock) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `Only ${product.stock} item(s) available in stock`,
    );
  }

  item.quantity = quantity;
  await item.save();

  return CartItemModel.findById(item._id).populate("product");
};

const removeCartItem = async (payload: { userId: string; itemId: string }) => {
  const { userId, itemId } = payload;

  const deleted = await CartItemModel.findOneAndDelete({
    _id: itemId,
    user: userId,
  });
  if (!deleted) {
    throw new AppError(httpStatus.NOT_FOUND, "Cart item not found");
  }

  return deleted;
};

export const CartServices = {
  addItemToCart,
  getMyCart,
  updateCartItemQuantity,
  removeCartItem,
};
