import bcrypt from "bcrypt";
import { createnewUser } from "../models/userModel.js";

export const userRegisterController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "all fields are required"
      });
    }
    // password hashing //
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await createnewUser({
      name,
      email,
      password: hashedPassword
    });
    res.status(200).json({
      success: true,
      message: "user is registered",
      data: user
    });
  } catch (error) {
    console.log("Registration error:", error);
    res.status(500).json({
      success: false,
      message: "server internal error",
      error: error.message
    });
  }
};