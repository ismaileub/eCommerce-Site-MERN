import AppError from "../../errorHelpers/AppError";
import httpStatus from "http-status-codes";
import { Response } from "express";
import { createUserTokens } from "../../utils/userTokens";
import { setAuthCookie } from "../../utils/setCookie";
import { User } from "../user/user.model";

const firebaseSignIn = async (payload: { email: string }, res: Response) => {
  const { email } = payload;

  const user = await User.findOne({ email });

  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      "User not found. Please signup first",
    );
  }

  const tokens = createUserTokens(user);

  setAuthCookie(res, tokens);

  return {
    user,
  };
};

export const AuthServices = {
  firebaseSignIn,
};
