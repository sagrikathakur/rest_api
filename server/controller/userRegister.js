import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createRegister,
  emailCheck,
  getAllUsers,
} from "../models/userModel.js";

// REGISTER USER
export const registerUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email already exists
    const existingUser = await emailCheck(email);

    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email already registered. Please sign in instead.",
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = await createRegister({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Registration successful!",
      user,
    });
  } catch (error) {
    console.error("Registration Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// LOGIN USER
export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await emailCheck(email);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(
      password,
      user.password
    );

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// GET LOGGED-IN USER
export const getMeController = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      user: req.user,
    });
  } catch (error) {
    console.error("Get Me Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// GET ALL USERS
export const getAllUserController = async (req, res) => {
  try {
    const users = await getAllUsers();

    return res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      users,
    });
  } catch (error) {
    console.error("Get All Users Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};