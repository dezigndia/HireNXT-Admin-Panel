import { User } from "models";
import {query} from '@utils';

export interface UserRepository {
    createUser(user: User): Promise<User>;
    getUserById(userId: number): Promise<User | null>;
    updateUser(userId: number, user: User): Promise<User | null>;
    deleteUser(userId: number): Promise<boolean>;
}

export class PostgreSQLUserRepository implements UserRepository {
    async createUser(user: User): Promise<User> {
        // Database query to insert a user
        return user;
    }
    
    async getUserById(userId: number): Promise<User | null> {
        const getQuery = `select * from users where id = $1`;
        const user = await query<User>(getQuery, [userId]);
        return user[0];
    }
    
    async updateUser(userId: number, user: User): Promise<User | null> {
        return user;
    }
    
    async deleteUser(userId: number): Promise<boolean> {
        const deleteQuery = `delete from users where id = $1`;
        await query(deleteQuery, [userId]);
        return true;
    }
}