"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartValidations = void 0;
const zod_1 = require("zod");
const addItem = zod_1.z.object({
    productId: zod_1.z.string({ required_error: "productId is required" }).min(1),
    quantity: zod_1.z.number().int().positive().max(999).optional().default(1),
});
const updateQuantity = zod_1.z.object({
    quantity: zod_1.z.number().int().positive().max(999),
});
exports.CartValidations = {
    addItem,
    updateQuantity,
};
