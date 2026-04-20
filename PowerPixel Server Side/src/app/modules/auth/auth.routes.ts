import { Router } from "express";

import { AuthControllers } from "./auth.controller";

const router = Router();

router.post("/signin", AuthControllers.firebaseSignIn);
router.post("/logout", AuthControllers.logout);

export const AuthRoutes = router;
