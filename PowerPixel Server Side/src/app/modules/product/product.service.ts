/* eslint-disable @typescript-eslint/no-explicit-any */
import httpStatus from "http-status-codes";
import AppError from "../../errorHelpers/AppError";
import { Product } from "./product.interfaces";
import { ProductModel } from "./product.model";

const createProduct = async (payload: Product) => {
  const result = await ProductModel.create(payload);
  return result;
};

const getAllProducts = async (query: any) => {
  const {
    search,

    brand,
    minPrice,
    maxPrice,
    sort = "price",
    order = "desc",
    page = 1,
    limit = 10,
  } = query;

  const filter: any = {};

  //  SEARCH (title, brand, specs.type)
  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { brand: { $regex: search, $options: "i" } },
      { "specs.type": { $regex: search, $options: "i" } },
    ];
  }

  //   //  FILTER BY HARDWARE TYPE (MOST IMPORTANT)
  //   if (type) {
  //     filter["specs.type"] = type;
  //   }

  if (brand) {
    filter.brand = brand;
  }

  if (minPrice || maxPrice) {
    filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
  }

  const sortOption: any = {};
  sortOption[sort] = order === "asc" ? 1 : -1;

  const skip = (Number(page) - 1) * Number(limit);

  const products = await ProductModel.find(filter)
    .sort(sortOption)
    .skip(skip)
    .limit(Number(limit));

  const total = await ProductModel.countDocuments(filter);

  return {
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPage: Math.ceil(total / Number(limit)),
    },
    data: products,
  };
};

const getProductById = async (id: string) => {
  const product = await ProductModel.findById(id);

  if (!product) {
    throw new AppError(httpStatus.NOT_FOUND, "Product Not Found");
  }

  return product;
};

const updateProductById = async (id: string, payload: Partial<Product>) => {
  const isProductExist = await ProductModel.findById(id);

  if (!isProductExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Product Not Found");
  }

  const updatedProduct = await ProductModel.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });

  return updatedProduct;
};

const deleteProductById = async (id: string) => {
  const isProductExist = await ProductModel.findById(id);

  if (!isProductExist) {
    throw new AppError(httpStatus.NOT_FOUND, "Product Not Found");
  }

  const deletedProduct = await ProductModel.findByIdAndDelete(id);
  return deletedProduct;
};

export const ProductService = {
  createProduct,
  getProductById,
  updateProductById,
  deleteProductById,
  getAllProducts,
};
