import { Types } from "mongoose";

export enum IsActive {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED",
}

export enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER",
}

export interface IUser {
  _id?: Types.ObjectId;
  name: string;
  email: string;
  picture?: string;
  role: Role;
  isVerified?: boolean;
  isActive?: IsActive;
  isDeleted?: boolean;
  createdAt?: Date;
}
