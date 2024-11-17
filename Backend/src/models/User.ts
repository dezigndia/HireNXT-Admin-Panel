import { Device, UserRole } from "core/enum-types";
import { query } from '../config/database';

export interface IUser {
    id: number;
    name: string;
    email: string;
    phone: string;
    dob: string;
    role: UserRole;
}

export interface IPayload {
    userId: number;
    role: UserRole;
    device: Device;
    email: string;
    phone: string;
}


export const findUserByUsername = async (email: string) => {
  const result = await query('SELECT * FROM auth.users WHERE email = $1', [email]);
  return result.rows[0];
};

export const createUser = async (email: string, password: string) => {
  const result = await query(
    'INSERT INTO auth.users (emails, password) VALUES ($1, $2) RETURNING id, username',
    [email, password]
  );
  return result.rows[0];
};
