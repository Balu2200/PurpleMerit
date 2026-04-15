import { Router } from 'express';
import { body } from 'express-validator';
import {
  createUser,
  deleteUser,
  getMe,
  getUserById,
  getUsers,
  updateMe,
  updateUser,
} from '../controllers/userController.js';
import { authenticate } from '../middleware/authMiddleware.js';
import { authorize } from '../middleware/roleMiddleware.js';

const router = Router();

router.use(authenticate);

router.get('/me', getMe);
router.put('/me', [body('name').optional().trim().isLength({ min: 2 }), body('password').optional().isLength({ min: 8 })], updateMe);

router.get('/', authorize('admin', 'manager'), getUsers);
router.post(
  '/',
  authorize('admin'),
  [
    body('name').trim().isLength({ min: 2 }).withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
    body('role').optional().isIn(['admin', 'manager', 'user']).withMessage('Invalid role'),
    body('status').optional().isIn(['active', 'inactive']).withMessage('Invalid status'),
  ],
  createUser
);

router.get('/:id', authorize('admin', 'manager'), getUserById);
router.put(
  '/:id',
  [
    body('name').optional().trim().isLength({ min: 2 }),
    body('email').optional().isEmail(),
    body('password').optional().isLength({ min: 8 }),
    body('role').optional().isIn(['admin', 'manager', 'user']),
    body('status').optional().isIn(['active', 'inactive']),
  ],
  updateUser
);
router.delete('/:id', authorize('admin', 'manager'), deleteUser);

export default router;
