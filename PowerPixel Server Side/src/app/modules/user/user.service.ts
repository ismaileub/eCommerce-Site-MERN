import httpStatus from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/AppError";
import { userSearchableFields } from "./user.constant";
import { IUser, Role } from "./user.interface";
import { User } from "./user.model";
import { QueryBuilder } from "../../utils/QueryBuilder";

const createUser = async (payload: Partial<IUser>) => {
  const data = payload as Partial<IUser> & { img?: string };
  const name = data.name;
  const email = data.email;
  const role = Role.USER;
  const picture = data.picture;

  if (!name || !email) {
    throw new AppError(httpStatus.BAD_REQUEST, "Name and email are required");
  }

  const isUserExist = await User.findOne({ email });

  if (isUserExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User Already Exist");
  }

  const user = await User.create({
    name,
    email,
    role,
    picture,
  });

  return user;
};

const updateUser = async (
  userId: string,
  payload: Partial<IUser>,
  decodedToken: JwtPayload,
) => {
  const data = payload as Partial<IUser> & { img?: string };
  const name = data.name;
  const email = data.email;
  const role = data.role;
  const picture = data.picture;

  if (decodedToken.role === Role.USER) {
    if (userId !== decodedToken.userId) {
      throw new AppError(401, "You are not authorized");
    }
  }

  const ifUserExist = await User.findById(userId);

  if (!ifUserExist) {
    throw new AppError(httpStatus.NOT_FOUND, "User Not Found");
  }

  if (
    decodedToken.role === Role.ADMIN &&
    ifUserExist.role === Role.SUPER_ADMIN
  ) {
    throw new AppError(401, "You are not authorized");
  }

  if (role) {
    if (decodedToken.role === Role.USER) {
      throw new AppError(httpStatus.FORBIDDEN, "You are not authorized");
    }

    if (role === Role.ADMIN && decodedToken.role !== Role.SUPER_ADMIN) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        "Only super admin can assign admin role",
      );
    }
  }

  if (email) {
    throw new AppError(httpStatus.BAD_REQUEST, "Email can not be updated");
  }

  const updatePayload: Partial<IUser> = {};

  if (typeof name === "string") {
    updatePayload.name = name;
  }

  if (typeof picture === "string") {
    updatePayload.picture = picture;
  }

  if (role) {
    updatePayload.role = role;
  }

  const newUpdatedUser = await User.findByIdAndUpdate(userId, updatePayload, {
    new: true,
    runValidators: true,
  });

  return newUpdatedUser;
};

const getAllUsers = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(User.find(), query);
  const usersData = queryBuilder
    .filter()
    .search(userSearchableFields)
    .sort()
    .fields()
    .paginate();

  const [data, meta] = await Promise.all([
    usersData.build(),
    queryBuilder.getMeta(),
  ]);

  return {
    data,
    meta,
  };
};
const getSingleUser = async (id: string) => {
  const user = await User.findById(id);
  return {
    data: user,
  };
};
const getMe = async (userId: string) => {
  const user = await User.findById(userId);
  return {
    data: user,
  };
};

export const UserServices = {
  createUser,
  getAllUsers,
  getSingleUser,
  updateUser,
  getMe,
};
