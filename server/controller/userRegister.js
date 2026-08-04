import bcrypt from "bcrypt";
import { createRegister, emailCheck } from "../models/userModel.js";
import { registerSchema } from "../validations/userRegisterValidate.js";

export const registerUserController = async (req, res) => {
  try {
    // Validate request body with Zod schema (includes confirmPassword check)
    const validationResult = registerSchema.safeParse(req.body);
    if (!validationResult.success) {
      const firstErrorMsg = validationResult.error.issues[0]?.message || "Validation failed";
      const formattedErrors = validationResult.error.issues.map((issue) => ({
        field: issue.path.join('.'),
        message: issue.message
      }));

      return res.status(400).json({
        success: false,
        message: firstErrorMsg,
        errors: formattedErrors
      });
    }

    const { name, email, password } = validationResult.data;

    // find user by email
    const emailCheckController = await emailCheck(email);
    if (emailCheckController) {
      return res.status(409).json({
        success: false,
        message: 'Email already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = await createRegister({
      name,
      email,
      password: hashedPassword
    });

    return res.status(201).json({
      success: true,
      message: "Registered successfully.",
      user
    });

  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Registration failed. Please try again."
    });
  }
};

