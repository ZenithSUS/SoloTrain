import { z } from "zod";

// Login Schema
export const loginSchema = z.object({
  email: z.email({ message: "Please enter a valid email" }),
  password: z.string().min(1, { message: "Password is required" }),
});

// Register Schema
export const registerSchema = z
  .object({
    email: z.email({ message: "Please enter a valid email" }),
    password: z.string(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password.length >= 8, {
    message: "Password must be at least 8 characters",
    path: ["password"],
  })
  .refine((data) => !data.password.match(/\s/), {
    message: "Password cannot contain spaces",
    path: ["password"],
  })
  .refine((data) => data.password.match(/[A-Z]/), {
    message: "Password must contain at least one uppercase letter",
    path: ["password"],
  })
  .refine((data) => data.password.match(/[a-z]/), {
    message: "Password must contain at least one lowercase letter",
    path: ["password"],
  })
  .refine((data) => data.password.match(/[0-9]/), {
    message: "Password must contain at least one number",
    path: ["password"],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
