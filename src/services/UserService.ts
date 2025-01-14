import { AppDataSource } from '../config/database';
import { User } from '../entities/User';

const userRepository = AppDataSource.getRepository(User);

const createUser = async (userData: Partial<User>): Promise<User> => {
  const user = userRepository.create(userData);
  return await userRepository.save(user);
};

const findUserById = async (id: number): Promise<User | null> => {
  return await userRepository.findOneBy({ id });
};

const findUserByEmail = async (email: string): Promise<User | null> => {
  return await userRepository.findOneBy({ email });
};

const updateUser = async (id: number, userData: Partial<User>): Promise<User | null> => {
  await userRepository.update(id, userData);
  return await userRepository.findOneBy({ id });
};

const deleteUser = async (id: number): Promise<boolean> => {
  const result = await userRepository.delete(id);
  return result.affected ? result.affected > 0 : false;
};

const getAllUsers = async (): Promise<User[]> => {
  return await userRepository.find();
};

export {
  createUser,
  findUserById,
  findUserByEmail,
  updateUser,
  deleteUser,
  getAllUsers
};
