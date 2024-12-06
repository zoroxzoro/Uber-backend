import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minLenght: [3, "First name should be at least 3 characters long"],
    },
    lastName: {
      type: String,
      required: true,
      minLenght: [3, "Last name should be at least 3 characters long"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    Select: false,
  },
  socketId: {
    type: String,
  },
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "24h",
  });
  return token;
};

// Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Static method to hash password
userSchema.statics.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

const User = mongoose.model("User", userSchema);
export default User;
