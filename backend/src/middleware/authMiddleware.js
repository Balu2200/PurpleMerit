import { asyncHandler } from '../utils/asyncHandler.js';
import { AppError } from '../utils/appError.js';
import { verifyToken } from '../utils/jwt.js';
import { User } from '../models/User.js';

const getTokenFromRequest = (req) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer ')) {
    return authHeader.slice(7);
  }

  return req.cookies?.token || req.headers['x-auth-token'];
};

export const authenticate = asyncHandler(async (req, _res, next) => {
  const token = getTokenFromRequest(req);

  if (!token) {
    throw new AppError('Not authorized, token missing', 401);
  }

  let decoded;
  try {
    decoded = verifyToken(token);
  } catch {
    throw new AppError('Not authorized, token invalid', 401);
  }

  const user = await User.findById(decoded.id).select('-password');

  if (!user) {
    throw new AppError('Not authorized, user not found', 401);
  }

  if (user.status !== 'active') {
    throw new AppError('Account is inactive', 403);
  }

  req.user = user;
  next();
});
