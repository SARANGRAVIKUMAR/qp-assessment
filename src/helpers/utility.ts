import { User } from "@/entities/User";
import { Constants } from "./constants";
import jwt from 'jsonwebtoken';


export const isAdmin = (role: number): boolean => {
    return role === Constants.ADMIN_ROLE;
};
export const createUserToken = (user: User): string => {
    const secret = Constants.JWT_SECRET;
    if (!secret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }
    return jwt.sign({ id: user.id }, secret, { expiresIn: '1d' });
};