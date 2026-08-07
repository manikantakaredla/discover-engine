import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';
import User from '../models/User.model.js';

// Admin: Get all users
export const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(new ApiResponse(200, users, 'Users fetched successfully'));
});

// Admin: Update user role or block user
export const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.role = req.body.role || user.role;
    user.status = req.body.status || user.status; // e.g. for blocking

    const updatedUser = await user.save();
    res.status(200).json(new ApiResponse(200, updatedUser, 'User updated successfully'));
  } else {
    throw new ApiError(404, 'User not found');
  }
});

// Admin: Delete user
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.deleteOne();
    res.status(200).json(new ApiResponse(200, {}, 'User removed successfully'));
  } else {
    throw new ApiError(404, 'User not found');
  }
});
