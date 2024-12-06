import express from "express";
const router = express.Router();
import { validator } from "../middleware/validator.js";
import { LoginSchema, SingUpSchema } from "../utils/validateSchema.js";
import {
  loginUser,
  logoutUser,
  myProfile,
  registerUser,
} from "../controller/User.controller.js";
import { isAuth } from "../middleware/authUser.js";

// post routes
router.post("/register", validator(SingUpSchema), registerUser);
router.post("/login", validator(LoginSchema), loginUser);

// get routes
router.get("/profile", isAuth, myProfile);
router.get("/logout", isAuth, logoutUser);

export default router;
