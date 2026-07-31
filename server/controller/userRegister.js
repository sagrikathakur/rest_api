import bcrypt from "bcrypt";
import { createnewUser } from "../models/userModel.js";
import e from "cors";

export const userRegisterController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        messsage: "all fields are required"
      })
    }
    // password hashing//
    const hashed = await bcrypt.hash(0, 10);
    const user = await createnewUser(
      name,
      email,
      password
    )
    res.status(200).json({
      succes: true,
      messsage: "user is registerd"
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      messsage: "server internal error"
    })

  }
}