import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import * as authService from '../services/auth/auth.service.js';

const setTokenCookie = (res, token) => {
  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  };
  res.cookie('jwt', token, cookieOptions);
};

export const register = asyncHandler(async (req, res) => {
  const result = await authService.registerUser(req.body);
  setTokenCookie(res, result.token);
  res.status(201).json(new ApiResponse(201, result, 'User registered successfully'));
});

export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await authService.loginUser(email, password);
  setTokenCookie(res, result.token);
  res.status(200).json(new ApiResponse(200, result, 'User logged in successfully'));
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await authService.getUserProfile(req.user._id);
  res.status(200).json(new ApiResponse(200, user, 'Profile fetched successfully'));
});

export const updateProfile = asyncHandler(async (req, res) => {
  const updatedUser = await authService.updateUserProfile(req.user._id, req.body);
  res.status(200).json(new ApiResponse(200, updatedUser, 'Profile updated successfully'));
});

export const deleteProfile = asyncHandler(async (req, res) => {
  await authService.deleteUserProfile(req.user._id);
  res.cookie('jwt', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json(new ApiResponse(200, {}, 'User deleted successfully'));
});

export const logout = asyncHandler(async (req, res) => {
  res.cookie('jwt', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json(new ApiResponse(200, {}, 'Logged out successfully'));
});
