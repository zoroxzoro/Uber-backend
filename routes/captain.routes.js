import express from "express";
const router = express.Router();
import { validator } from "../middleware/validator.js";
import { registerCaptain } from "../controller/captain.controller.js";
import { captainSchema } from "../utils/validateSchema.js";

router.post("/register", validator(captainSchema), registerCaptain);

export default router;
