import { Captain } from "../models/captain.modle.js";
import { createCaptain } from "../services/captain.services.js";

export const registerCaptain = async (req, res, next) => {
  try {
    const { fullName, email, password, vehical } = req.body;
    const isCaptainAlreadyExists = await Captain.findOne({ email });
    if (isCaptainAlreadyExists)
      return res.status(400).json({ msg: "Captain already exists" });

    const HashPassword = await Captain.hashPassword(password);

    const captain = await createCaptain({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: HashPassword,
      color: vehical.color,
      plateNumber: vehical.plateNumber,
      capacity: vehical.capacity,
      vehicalType: vehical.vehicalType,
    });

    const Token = captain.generateAuthToken();
    return res.status(201).json({ Token, captain });
  } catch (error) {
    next(error);
  }
};
