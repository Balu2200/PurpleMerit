import { Router } from 'express';
import { body } from 'express-validator';
import { getMe, login, register } from '../controllers/authController.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = Router();

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  ],
  login
);

router.post(
  '/register',
  [
    body('name').trim().isLength({ min: 2 }).withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('role').optional().isIn(['admin', 'manager', 'user']).withMessage('Invalid role'),
    body('inviteCode').optional().isString().withMessage('Invite code must be a string'),
  ],
  register
);

router.get('/me', authenticate, getMe);

export default router;
