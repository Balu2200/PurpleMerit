import { AppError } from '../utils/appError.js';

const handleCastError = () => new AppError('Invalid resource id', 400);
const handleDuplicateKeyError = (error) => {
  const field = Object.keys(error.keyValue || {})[0] || 'field';
  return new AppError(`${field} already exists`, 400);
};
const handleValidationError = (error) => {
  const message = Object.values(error.errors)
    .map((item) => item.message)
    .join(', ');
  return new AppError(message, 400);
};

export const notFound = (req, _res, next) => {
  next(new AppError(`Route not found: ${req.originalUrl}`, 404));
};

export const errorHandler = (error, _req, res, _next) => {
  const statusCode = error.statusCode || 500;
  let processedError = error;

  if (error.name === 'CastError') {
    processedError = handleCastError();
  }

  if (error.code === 11000) {
    processedError = handleDuplicateKeyError(error);
  }

  if (error.name === 'ValidationError') {
    processedError = handleValidationError(error);
  }

  res.status(statusCode).json({
    success: false,
    message: processedError.message || 'Internal server error',
    errors: processedError.errors || undefined,
  });
};
