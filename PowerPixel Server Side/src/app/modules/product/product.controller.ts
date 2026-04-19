import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { ProductService } from "./product.service";
import httpStatus from "http-status-codes";
import { sendResponse } from "../../utils/sendResponse";

const createProduct = catchAsync(async (req: Request, res: Response) => {
  const product = await ProductService.createProduct(req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.CREATED,
    message: "Product Created Successfully",
    data: product,
  });
});

// ==========================
// GET ALL PRODUCTS (SEARCH + FILTER + PAGINATION)
// ==========================

const getAllProducts = catchAsync(async (req: Request, res: Response) => {
  const result = await ProductService.getAllProducts(req.query);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Products Retrieved Successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getProductById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await ProductService.getProductById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product Retrieved Successfully",
    data: product,
  });
});

const updateProductById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const product = await ProductService.updateProductById(id, req.body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product Updated Successfully",
    data: product,
  });
});

const deleteProductById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  await ProductService.deleteProductById(id);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: "Product Deleted Successfully",
    data: [],
  });
});

export const ProductController = {
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  getAllProducts,
};
