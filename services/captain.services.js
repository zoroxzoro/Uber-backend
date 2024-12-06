import { Captain } from "../models/captain.modle.js";

export const createCaptain = async ({
  firstName,
  lastName,
  email,
  password,
  color,
  plateNumber,
  capacity,
  vehicalType,
}) => {
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !color ||
    !plateNumber ||
    !capacity ||
    !vehicalType
  ) {
    throw new Error("All fields are required");
  }
  const captain = await Captain.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password,
    vehical: {
      color,
      plateNumber,
      capacity,
      vehicalType,
    },
  });
  return captain;
};
