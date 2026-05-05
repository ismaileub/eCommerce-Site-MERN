import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { CartServices } from "./cart.service";

const addItem = catchAsync(async (req, res) => {
  const decodedToken = req.user as JwtPayload;

  const item = await CartServices.addItemToCart({
    userId: decodedToken.userId,
    productId: req.body.productId,
    quantity: req.body.quantity,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Added to cart",
    data: item,
  });
});

const getMyCart = catchAsync(async (req, res) => {
  const decodedToken = req.user as JwtPayload;

  const result = await CartServices.getMyCart(decodedToken.userId);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cart retrieved successfully",
    data: result,
  });
});

const updateQuantity = catchAsync(async (req, res) => {
  const decodedToken = req.user as JwtPayload;

  const item = await CartServices.updateCartItemQuantity({
    userId: decodedToken.userId,
    itemId: req.params.itemId,
    quantity: req.body.quantity,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Cart updated",
    data: item,
  });
});

const removeItem = catchAsync(async (req, res) => {
  const decodedToken = req.user as JwtPayload;

  const item = await CartServices.removeCartItem({
    userId: decodedToken.userId,
    itemId: req.params.itemId,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Removed from cart",
    data: item,
  });
});

export const CartControllers = {
  addItem,
  getMyCart,
  updateQuantity,
  removeItem,
};
