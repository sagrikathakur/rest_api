// controllers//
import {
  createUsersModel,
  getAllUsersModel,
  getUserByIdModel,
  updateUsersModel,
  deleteUsersModel,
  searchUsersModel
} from '../models/product.js';

// create user //
export const createUserController = async (req, res) => {
  try {
    const createUser = await createUsersModel(req.body || {});
    res.status(201).json({
      message: "USER CREATED SUCCESSFULLY",
      data: createUser
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "server error"
    });
  }
};

// get user //
export const getUserController = async (req, res) => {
  try {
    const getAllUser = await getAllUsersModel();
    res.status(200).json({
      message: "GET ALL USERS",
      data: getAllUser
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "server error"
    });
  }
};

// get user by id //
export const getUserByIdController = async (req, res) => {
  try {
    const getUserById = await getUserByIdModel(req.params.id);
    if (!getUserById) {
      return res.status(404).json({
        message: "User not found"
      });
    }
    res.status(200).json({
      message: "User retrieved successfully",
      data: getUserById
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "server error"
    });
  }
};

// update user //
export const updateUserController = async (req, res) => {
  try {
    const updateUsers = await updateUsersModel(req.body || {}, req.params.id);
    if (!updateUsers) {
      return res.status(404).json({
        message: "User not found to update"
      });
    }
    res.status(200).json({
      message: "User updated successfully",
      data: updateUsers
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "server error"
    });
  }
};

// delete user //
export const deleteUserController = async (req, res) => {
  try {
    const deleteUsers = await deleteUsersModel(req.params.id);
    if (!deleteUsers) {
      return res.status(404).json({
        message: "User not found to delete"
      });
    }
    res.status(200).json({
      message: "User deleted successfully",
      data: deleteUsers
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "server error"
    });
  }
};

// search user //
export const searchUserController = async (req, res) => {
  try {
    const searchUsers = await searchUsersModel(req.params.name);
    res.status(200).json({
      message: "Search user successfully",
      data: searchUsers
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "server error"
    });
  }
};
