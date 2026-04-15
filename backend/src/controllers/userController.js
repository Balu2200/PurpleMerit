import mongoose from 'mongoose';
import { validationResult } from 'express-validator';
import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/appError.js';
import { User } from '../models/User.js';

const buildUserQuery = (query = {}) => {
  const filter = {};

  if (query.search) {
    const searchRegex = new RegExp(query.search, 'i');
    filter.$or = [{ name: searchRegex }, { email: searchRegex }];
  }

  if (query.role) {
    filter.role = query.role;
  }

  if (query.status) {
    filter.status = query.status;
  }

  return filter;
};

const shouldBlockAction = (actor, targetUser) => {
  if (actor.role === 'manager' && targetUser.role === 'admin') {
    return 'Managers cannot modify admin users';
  }

  return null;
};

export const getUsers = asyncHandler(async (req, res) => {
  const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(parseInt(req.query.limit, 10) || 10, 1), 100);
  const skip = (page - 1) * limit;
  const filter = buildUserQuery(req.query);

  const [users, total] = await Promise.all([
    User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).select('-password'),
    User.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    message: 'Users fetched successfully',
    data: {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit) || 1,
      },
    },
  });
});

export const getUserById = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    throw new AppError('Invalid user id', 400);
  }

  const user = await User.findById(req.params.id)
    .populate('createdBy', 'name email role')
    .populate('updatedBy', 'name email role')
    .select('-password');

  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'User fetched successfully',
    data: user,
  });
});

export const createUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Validation failed', 400);
  }

  const { name, email, password, role = 'user', status = 'active' } = req.body;
  const existingUser = await User.findOne({ email: email.toLowerCase().trim() });

  if (existingUser) {
    throw new AppError('Email already in use', 400);
  }

  const user = await User.create({
    name,
    email: email.toLowerCase().trim(),
    password,
    role,
    status,
    createdBy: req.user._id,
    updatedBy: req.user._id,
  });

  res.status(201).json({
    success: true,
    message: 'User created successfully',
    data: await User.findById(user._id).select('-password'),
  });
});

export const updateUser = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Validation failed', 400);
  }

  if (!mongoose.isValidObjectId(req.params.id)) {
    throw new AppError('Invalid user id', 400);
  }

  const targetUser = await User.findById(req.params.id).select('+password');

  if (!targetUser) {
    throw new AppError('User not found', 404);
  }

  const blockedReason = shouldBlockAction(req.user, targetUser);
  if (blockedReason) {
    throw new AppError(blockedReason, 403);
  }

  const update = {};
  const allowedFields = ['name', 'email', 'role', 'status', 'password'];

  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      if (field === 'email') {
        update[field] = req.body[field].toLowerCase().trim();
      } else {
        update[field] = req.body[field];
      }
    }
  }

  if (req.user.role === 'manager') {
    delete update.role;
    if (targetUser.role === 'admin') {
      throw new AppError('Managers cannot modify admin users', 403);
    }
  }

  if (req.user.role === 'user' && req.user._id.toString() !== targetUser._id.toString()) {
    throw new AppError('Forbidden', 403);
  }

  update.updatedBy = req.user._id;

  const updatedUser = await User.findByIdAndUpdate(req.params.id, update, {
    new: true,
    runValidators: true,
  }).select('-password');

  res.status(200).json({
    success: true,
    message: 'User updated successfully',
    data: updatedUser,
  });
});

export const deleteUser = asyncHandler(async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    throw new AppError('Invalid user id', 400);
  }

  const targetUser = await User.findById(req.params.id);

  if (!targetUser) {
    throw new AppError('User not found', 404);
  }

  if (req.user.role === 'manager' && targetUser.role === 'admin') {
    throw new AppError('Managers cannot delete admin users', 403);
  }

  if (req.user.role === 'user') {
    throw new AppError('Forbidden', 403);
  }

  targetUser.status = 'inactive';
  targetUser.updatedBy = req.user._id;
  await targetUser.save();

  res.status(200).json({
    success: true,
    message: 'User deactivated successfully',
    data: null,
  });
});

export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)
    .populate('createdBy', 'name email role')
    .populate('updatedBy', 'name email role')
    .select('-password');

  if (!user) {
    throw new AppError('User not found', 404);
  }

  res.status(200).json({
    success: true,
    message: 'Profile fetched successfully',
    data: user,
  });
});

export const updateMe = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new AppError('Validation failed', 400);
  }

  const updates = {};
  if (req.body.name !== undefined) updates.name = req.body.name;
  if (req.body.password !== undefined) updates.password = req.body.password;

  const user = await User.findById(req.user._id).select('+password');

  if (!user) {
    throw new AppError('User not found', 404);
  }

  if (updates.name) {
    user.name = updates.name;
  }

  if (updates.password) {
    user.password = updates.password;
  }

  user.updatedBy = req.user._id;
  await user.save();

  const safeUser = await User.findById(req.user._id).select('-password');

  res.status(200).json({
    success: true,
    message: 'Profile updated successfully',
    data: safeUser,
  });
});
