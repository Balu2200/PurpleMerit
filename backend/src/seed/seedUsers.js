import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from '../config/db.js';
import { User } from '../models/User.js';

export const seedUsers = async () => {
  const defaults = [
    {
      name: 'Admin User',
      email: 'admin@example.com',
      password: 'Admin@123',
      role: 'admin',
      status: 'active',
    },
    {
      name: 'Manager User',
      email: 'manager@example.com',
      password: 'Manager@123',
      role: 'manager',
      status: 'active',
    },
    {
      name: 'Regular User',
      email: 'user@example.com',
      password: 'User@123',
      role: 'user',
      status: 'active',
    },
  ];

  for (const entry of defaults) {
    const existing = await User.findOne({ email: entry.email });
    if (!existing) {
      await User.create(entry);
    }
  }
};

if (process.argv[1] && process.argv[1].includes('seedUsers.js')) {
  connectDB()
    .then(() => seedUsers())
    .then(() => {
      console.log('Seed users created successfully');
      process.exit(0);
    })
    .catch((error) => {
      console.error('Seed failed:', error.message);
      process.exit(1);
    });
}
