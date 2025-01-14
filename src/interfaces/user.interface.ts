import { User } from '../entities/User';

export interface UserResponse extends Omit<User, 'password' | 'hashPassword' | 'comparePassword'> {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthResponse {
  user: UserResponse;
  token: string;
}
