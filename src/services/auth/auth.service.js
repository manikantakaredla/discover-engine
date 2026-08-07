import User from '../../models/User.model.js';
import { ApiError } from '../../utils/ApiError.js';
import { generateToken } from '../../security/jwt.js';

export const registerUser = async (userData) => {
  const { name, email, password } = userData;

  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new ApiError(400, 'User already exists');
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    };
  } else {
    throw new ApiError(400, 'Invalid user data');
  }
};

export const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select('+password');

  if (user && (await user.matchPassword(password))) {
    return {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    };
  } else {
    throw new ApiError(401, 'Invalid email or password');
  }
};

export const getUserProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return user;
};

export const updateUserProfile = async (userId, updateData) => {
  const user = await User.findById(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }

  user.name = updateData.name || user.name;
  user.email = updateData.email || user.email;
  user.profileImage = updateData.profileImage || user.profileImage;
  if (updateData.preferences) {
    user.preferences = updateData.preferences;
  }
  
  if (updateData.password) {
    user.password = updateData.password;
  }

  const updatedUser = await user.save();

  return {
    _id: updatedUser._id,
    name: updatedUser.name,
    email: updatedUser.email,
    role: updatedUser.role,
    preferences: updatedUser.preferences,
  };
};

export const deleteUserProfile = async (userId) => {
  const user = await User.findByIdAndDelete(userId);
  if (!user) {
    throw new ApiError(404, 'User not found');
  }
  return true;
};
