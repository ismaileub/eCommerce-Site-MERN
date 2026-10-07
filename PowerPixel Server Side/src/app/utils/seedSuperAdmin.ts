/* eslint-disable no-console */
import { envVars } from "../config/env";
import { IsActive, IUser, Role } from "../modules/user/user.interface";
import { User } from "../modules/user/user.model";

export const seedSuperAdmin = async () => {
  try {
    const isSuperAdminExist = await User.findOne({
      email: envVars.SUPER_ADMIN_EMAIL,
    });

    if (isSuperAdminExist) {
      console.log("Super Admin Already Exists!");
      return;
    }

    console.log("Trying to create Super Admin...");

    const payload: Partial<IUser> = {
      name: "Super admin",
      role: Role.SUPER_ADMIN,
      email: envVars.SUPER_ADMIN_EMAIL,
      isVerified: true,
      isActive: IsActive.ACTIVE,
      isDeleted: false,
    };

    const superadmin = await User.create(payload);
    console.log("Super Admin Created Successfully!\n");
    console.log(superadmin);
  } catch (error) {
    console.log(error);
  }
};
