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
