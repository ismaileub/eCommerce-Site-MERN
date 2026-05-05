import { z } from "zod";

const addItem = z.object({
  productId: z.string({ required_error: "productId is required" }).min(1),
  quantity: z.number().int().positive().max(999).optional().default(1),
});

const updateQuantity = z.object({
  quantity: z.number().int().positive().max(999),
});

export const CartValidations = {
  addItem,
  updateQuantity,
};
