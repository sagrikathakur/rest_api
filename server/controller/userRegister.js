import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  createRegister,
  emailCheck,
  getAllUsers,
} from "../models/userModel.js";
import {
  createRefreshToken,
  findRefreshToken,
  revokeRefreshToken,
} from "../models/refreshTokenModel.js";

const getRefreshTokenSecret = () => process.env.REFRESH_TOKEN_SECRET || process.env.JWT_SECRET;

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

    // Generate Short-lived Access Token (15 minutes)
    const accessToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    // Generate Long-lived Refresh Token (7 days)
    const refreshToken = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      getRefreshTokenSecret(),
      {
        expiresIn: "7d",
      }
    );

    // Store Refresh Token in DB
    const refreshExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
    await createRefreshToken(user.id, refreshToken, refreshExpiresAt);

    return res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken,
      refreshToken,
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

// REFRESH ACCESS TOKEN
export const refreshTokenController = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken || req.headers['x-refresh-token'];

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token is required.",
      });
    }

    // Verify token signature
    let decoded;
    try {
      decoded = jwt.verify(refreshToken, getRefreshTokenSecret());
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired refresh token. Please log in again.",
      });
    }

    // Check token status in database
    const savedToken = await findRefreshToken(refreshToken);
    if (!savedToken || savedToken.is_revoked || new Date(savedToken.expires_at) < new Date()) {
      return res.status(401).json({
        success: false,
        message: "Refresh token has been revoked or expired. Please log in again.",
      });
    }

    // Issue a new short-lived Access Token (15m)
    const newAccessToken = jwt.sign(
      {
        id: decoded.id,
        email: decoded.email,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "15m",
      }
    );

    return res.status(200).json({
      success: true,
      message: "Access token refreshed successfully.",
      accessToken: newAccessToken,
    });
  } catch (error) {
    console.error("Refresh Token Error:", error);

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

// LOGOUT USER
export const logoutUserController = async (req, res) => {
  try {
    const refreshToken = req.body.refreshToken || req.headers['x-refresh-token'];

    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: "Refresh token is required for logout.",
      });
    }

    // Revoke Refresh Token in DB
    await revokeRefreshToken(refreshToken);

    return res.status(200).json({
      success: true,
      message: "Logout successful. Session revoked.",
    });
  } catch (error) {
    console.error("Logout Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};