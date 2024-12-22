import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { findUserByUsername } from '../models/User';
import dotenv from 'dotenv';

dotenv.config();

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env;

export const loginUser = async (email: string, password: string) => {
  const user = await findUserByUsername(email);

  if (!user) {
    throw new Error('user with this email not found');
  }

  // Compare the password using bcrypt
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  const isMatch = await bcrypt.compare(password, hashedPassword);
  if (!isMatch) {
    throw new Error('Invalid credentials');
  }

  // Create JWT
  const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET!, {
    expiresIn: JWT_EXPIRES_IN,
  });

  return { token };
};
