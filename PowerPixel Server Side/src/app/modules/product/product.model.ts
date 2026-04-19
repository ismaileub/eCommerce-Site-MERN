import mongoose, { Schema } from "mongoose";
import { Product } from "./product.interfaces";

const productSchema = new Schema<Product>(
  {
    title: { type: String, required: true },
    price: { type: Number, required: true },
    brand: { type: String, required: true },
    stock: { type: Number, default: 0 },
    images: { type: String, required: true },
    description: { type: String },

    // 🔥 dynamic specs (handled by frontend + validation layer)
    specs: {
      type: Schema.Types.Mixed,
      required: true,
    },
  },
  { timestamps: true },
);

export const ProductModel = mongoose.model<Product>("Product", productSchema);
