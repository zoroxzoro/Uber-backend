import { z } from "zod";

export const SingUpSchema = z.object({
  fullName: z.object({
    firstName: z
      .string()
      .min(3, "First name should be at least 3 characters long"),
    lastName: z
      .string()
      .min(3, "Last name should be at least 3 characters long"),
  }),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
    ),
});

export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters long"),
});

export const captainSchema = z.object({
  fullName: z.object({
    firstName: z
      .string()
      .min(3, "First name should be at least 3 characters long"),
    lastName: z
      .string()
      .min(3, "Last name should be at least 3 characters long"),
  }),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  socketId: z.string().optional(),
  status: z.enum(["available", "unavailable"]).optional(),
  vehical: z.object({
    color: z.string().min(1, "Color is required"),
    plateNumber: z.string().min(1, "Plate number is required"),
    capacity: z
      .number()
      .min(1, "Capacity must be at least 1")
      .int("Capacity must be an integer"),
    vehicalType: z.enum(["car", "motorcycle", "auto"]),
    location: z
      .object({
        lat: z.number().optional(),
        lag: z.number().optional(), // Assuming "lag" is intended to mean "longitude".
      })
      .optional(),
  }),
});
