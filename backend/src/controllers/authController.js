import { validationResult } from 'express-validator';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/appError.js';
import { User } from '../models/User.js';
import { createAuthToken } from '../services/tokenService.js';

const sendAuthResponse = (res, user, statusCode = 200) => {
  const token = createAuthToken(user._id.toString(), user.role);

  res.status(statusCode).json({
    success: true,
    message: 'Authentication successful',
    data: {
      token,
      user,
    },
  });
};

export const login = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Validation failed', 400);
  }

  const { email, password } = req.body;
  const user = await User.findOne({ email: email.toLowerCase().trim() }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    throw new AppError('Invalid email or password', 401);
  }

  if (user.status !== 'active') {
    throw new AppError('Account is inactive', 403);
  }

  const safeUser = await User.findById(user._id).select('-password');
  sendAuthResponse(res, safeUser);
});

export const register = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Validation failed', 400);
  }

  const { name, email, password, role = 'user', inviteCode } = req.body;
  const normalizedRole = ['admin', 'manager', 'user'].includes(role) ? role : 'user';
  const existingUser = await User.findOne({ email: email.toLowerCase().trim() });

  if (existingUser) {
    throw new AppError('Email already in use', 400);
  }

  if (normalizedRole !== 'user') {
    if (!process.env.SIGNUP_INVITE_CODE) {
      throw new AppError('Signup invite code is not configured', 500);
    }

    if (!inviteCode || inviteCode !== process.env.SIGNUP_INVITE_CODE) {
      throw new AppError('Invalid invite code for elevated role signup', 403);
    }
  }

  const user = await User.create({
    name,
    email: email.toLowerCase().trim(),
    password,
    role: normalizedRole,
    status: 'active',
  });

  const safeUser = await User.findById(user._id).select('-password');
  sendAuthResponse(res, safeUser, 201);
});

export const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Current user fetched successfully',
    data: req.user,
  });
});
