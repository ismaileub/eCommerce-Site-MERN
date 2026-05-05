import { model, Schema } from "mongoose";
import { ICartItem } from "./cart.interface";

const cartItemSchema = new Schema<ICartItem>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

cartItemSchema.index({ user: 1, product: 1 }, { unique: true });

export const CartItemModel = model<ICartItem>("CartItem", cartItemSchema);
