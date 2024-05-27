import { Device, UserRole } from "core/enum-types";


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