import bcrypt from "bcrypt";
import { checkEmailExists, createnewUser } from "../models/userModel.js";

export const userRegisterController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "all fields are required"
      });
    }

    // Check if email already exists
    const existingUser = await checkEmailExists(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "email already exists. why dont you put another email girl 😎🌈"
      });
    }

    // Password hashing //
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createnewUser({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: "user is registered",
      data: user
    });
  } catch (error) {
    console.log("Registration error:", error);
    if (
      error.code === '23505' ||
      (error.message && (error.message.includes('unique constraint') || error.message.includes('duplicate key')))
    ) {
      return res.status(409).json({
        success: false,
        message: "email already exists. why dont you put another email girl 😎🌈"
      });
    }
    res.status(500).json({
      success: false,
      message: "server internal error",
      error: error.message
    });
  }
};

// Check email controller endpoint
export const checkEmailController = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "email is required" });
    }
    const existingUser = await checkEmailExists(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        exists: true,
        message: "email already exists. why dont you put another email girl 😎🌈"
      });
    }
    return res.status(200).json({
      success: true,
      exists: false,
      message: "email is available"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "server internal error",
      error: error.message
    });
  }
};