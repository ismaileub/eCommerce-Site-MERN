import { Types } from "mongoose";

export interface ICartItem {
  _id?: Types.ObjectId;
  user: Types.ObjectId;
  product: Types.ObjectId;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
}
