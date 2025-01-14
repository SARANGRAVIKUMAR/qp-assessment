import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import { UserResponse, AuthResponse } from '../interfaces/user.interface';
import { Constants } from '../helpers/constants';
import { createUserToken } from '../helpers/utility';

const userRepository = AppDataSource.getRepository(User);

export {
  createUser,
  login,
  findUserById,
  findUserByEmail,
  updateUser,
  deleteUser,
  getAllUsers,
  seedUser,
  createAdminUser
};


const seedUser = async (userData: Partial<User>) => {
  const existingUser = await userRepository.findOneBy({ email: userData.email });
  if (existingUser) {
    return;
  }
  const user = userRepository.create(userData);
  await userRepository.save(user);
};

const createAdminUser = async (userData: Partial<User>) => {
  userData.role = Constants.ADMIN_ROLE;
  const user = userRepository.create(userData);
  await userRepository.save(user);
  const token = createUserToken(user);
  return { user: user as UserResponse, token };
};

const createUser = async (userData: Partial<User>): Promise<AuthResponse> => {
  const user = userRepository.create(userData);
  await userRepository.save(user);

  const token = createUserToken(user);
  return { user: user as UserResponse, token };
};

const login = async (email: string, password: string): Promise<AuthResponse | null> => {
  const user = await userRepository.findOne({
    where: { email },
    select: ['id', 'firstName', 'lastName', 'email', 'password', 'createdAt', 'updatedAt']
  });
  if (!user || !(await user.comparePassword(password))) {
    return null;
  }
  const token = createUserToken(user);

  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword as UserResponse, token };
};

const findUserById = async (id: number): Promise<UserResponse | null> => {
  const user = await userRepository.findOneBy({ id });

  return user as UserResponse | null;
};

const findUserByEmail = async (email: string): Promise<UserResponse | null> => {
  const user = await userRepository.findOneBy({ email });

  return user as UserResponse | null;
};

const updateUser = async (id: number, userData: Partial<User>): Promise<UserResponse | null> => {
  await userRepository.update(id, userData);
  const user = await userRepository.findOneBy({ id });

  return user as UserResponse | null;
};

const deleteUser = async (id: number): Promise<boolean> => {
  const result = await userRepository.delete(id);
  return result.affected ? result.affected > 0 : false;
};

const getAllUsers = async (): Promise<UserResponse[]> => {
  const users = await userRepository.find();
  return users as UserResponse[];
};
