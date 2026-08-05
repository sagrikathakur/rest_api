import { z } from "zod";

export const registerSchema = z
  .object({
    name: z
      .string({
        invalid_type_error: "Name must be a string",
        required_error: "Name is required",
      })
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name is too long"),

    email: z
      .string({
        invalid_type_error: "Email must be a string",
        required_error: "Email is required",
      })
      .email("Invalid email address"),

    password: z
      .string({
        invalid_type_error: "Password must be a string",
        required_error: "Password is required",
      })
      .min(8, "Password must be at least 8 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/,
        "Password must contain uppercase, lowercase, number and special character"
      ),

    confirmPassword: z.string().optional()
  })
  .refine((data) => !data.confirmPassword || data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"]
  });
