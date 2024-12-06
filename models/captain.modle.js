import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const captainSchema = new mongoose.Schema({
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
    match: [/.+@.+\..+/, "Please enter a valid email address"],
  },
  password: {
    type: String,
    required: true,
    Select: false,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["available", "unavailable"],
    default: "available",
  },
  vehical: {
    color: {
      type: String,
      required: true,
    },
    plateNumber: {
      type: String,
      required: true,
    },
    capacity: {
      type: Number,
      required: true,
    },
    vehicalType: {
      type: String,
      required: true,
      emun: ["car", "motorcycle", "auto"],
    },
    location: {
      lat: {
        type: Number,
      },
      lag: {
        type: Number,
      },
    },
  },
});

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "24h",
  });
  return token;
};
// Method to compare passwords
captainSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Static method to hash password
captainSchema.statics.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

export const Captain = mongoose.model("Captain", captainSchema);
