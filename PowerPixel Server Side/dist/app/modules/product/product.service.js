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
exports.ProductService = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const http_status_codes_1 = __importDefault(require("http-status-codes"));
const AppError_1 = __importDefault(require("../../errorHelpers/AppError"));
const product_model_1 = require("./product.model");
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.create(payload);
    return result;
});
const getAllProducts = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const { search, type, brand, minPrice, maxPrice, sort = "createdAt", order = "desc", page = 1, limit = 10, } = query;
    const filter = {};
    //  SEARCH (title, brand, specs.type)
    if (search) {
        filter.$or = [
            { title: { $regex: search, $options: "i" } },
            { brand: { $regex: search, $options: "i" } },
            { "specs.type": { $regex: search, $options: "i" } },
        ];
    }
    //  FILTER BY HARDWARE TYPE (specs.type)
    if (type) {
        filter["specs.type"] = type;
    }
    if (brand) {
        filter.brand = brand;
    }
    if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice)
            filter.price.$gte = Number(minPrice);
        if (maxPrice)
            filter.price.$lte = Number(maxPrice);
    }
    const sortOption = {};
    sortOption[sort] = order === "asc" ? 1 : -1;
    const skip = (Number(page) - 1) * Number(limit);
    const products = yield product_model_1.ProductModel.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(Number(limit));
    const total = yield product_model_1.ProductModel.countDocuments(filter);
    return {
        meta: {
            total,
            page: Number(page),
            limit: Number(limit),
            totalPage: Math.ceil(total / Number(limit)),
        },
        data: products,
    };
});
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_model_1.ProductModel.findById(id);
    if (!product) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Product Not Found");
    }
    return product;
});
const updateProductById = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isProductExist = yield product_model_1.ProductModel.findById(id);
    if (!isProductExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Product Not Found");
    }
    const updatedProduct = yield product_model_1.ProductModel.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return updatedProduct;
});
const deleteProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const isProductExist = yield product_model_1.ProductModel.findById(id);
    if (!isProductExist) {
        throw new AppError_1.default(http_status_codes_1.default.NOT_FOUND, "Product Not Found");
    }
    const deletedProduct = yield product_model_1.ProductModel.findByIdAndDelete(id);
    return deletedProduct;
});
exports.ProductService = {
    createProduct,
    getProductById,
    updateProductById,
    deleteProductById,
    getAllProducts,
};
