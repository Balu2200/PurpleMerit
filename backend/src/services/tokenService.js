import { signToken } from '../utils/jwt.js';

export const createAuthToken = (userId, role) => signToken({ id: userId, role });
