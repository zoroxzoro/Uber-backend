import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../models/user.modle.js";
import { BlacklistToken } from "../models/blacklistToken.js";

export const isAuth = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const isBlacklisted = await BlacklistToken.findOne({ token: token });

  if (isBlacklisted) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    const user = await User.findById(decoded._id);

    req.user = user;

    return next();
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
