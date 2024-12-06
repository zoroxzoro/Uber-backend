import { BlacklistToken } from "../models/blacklistToken.js";
import User from "../models/user.modle.js";
import { createUser } from "../services/user.services.js";

export const registerUser = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    const isUserAlreadyExists = await User.findOne({ email });
    if (isUserAlreadyExists)
      return res.status(400).json({ msg: "User already exists" });

    // Hash the password
    const hashPassword = await User.hashPassword(password);

    // Create the user
    const user = await createUser({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: hashPassword,
    });

    // Generate the token using the user instance
    const Token = user.generateAuthToken();

    return res.status(201).json({ user, Token });
  } catch (error) {
    next(error); // Pass the error to the global error handler
  }
};

export const loginUser = async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return res.status(400).json({ msg: "User not found" });
  }
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  const Token = user.generateAuthToken();
  res.cookie("token", Token);
  return res.status(200).json({ msg: "Login successful", user, Token });
};
export const myProfile = async (req, res, next) => {
  return res.status(200).json({ user: req.user });
};

export const logoutUser = async (req, res, next) => {
  res.clearCookie("token");
  const token = req.cookies.token || req.headers.authorization.split(" ")[1];

  await BlacklistToken.create({ token });

  res.status(200).json({ message: "Logged out" });
};
