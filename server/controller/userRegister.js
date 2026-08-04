import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createRegister, emailCheck, getAllUsers } from "../models/userModel.js";

// REGISTER USER
export const registerUserController = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if email exists
    const existingUser = await emailCheck(email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: 'Email already registered. Please sign in instead.'
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
      message: "Registration successful! You can now log in.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Registration error:", error);

    return res.status(500).json({
      success: false,
      message: "Registration failed. Please try again."
    });
  }
};

// LOGIN USER
export const loginUserController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Find user by email
    const user = await emailCheck(email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    // 2. Compare entered password with stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password.'
      });
    }

    // 3. Generate JWT Token
    const secret = process.env.JWT_SECRET || 'supersecretkey_for_learning_auth_12345';
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      secret,
      { expiresIn: '1h' }
    );

    return res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      success: false,
      message: "Login failed due to a server error."
    });
  }
};

// GET AUTHENTICATED USER PROFILE (/api/me)
export const getMeController = async (req, res) => {
  try {
    // req.user is set by verifyToken middleware
    return res.status(200).json({
      success: true,
      message: "Profile retrieved successfully using valid JWT token.",
      user: req.user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch user profile."
    });
  }
};

// GET ALL USERS
export const getAllUserController = async (req, res) => {
  try {
    const userGet = await getAllUsers();
    return res.status(200).json({
      success: true,
      message: "All users fetched successfully",
      users: userGet
    });
  } catch (error) {
    console.error("All users fetch error:", error);
    return res.status(500).json({
      success: false,
      message: "All users fetch failed. Please try again."
    });
  }
};