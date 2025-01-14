import { Request, Response } from 'express';
import * as UserService from '../services/UserService';

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.createUser(req.body);
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error });
  }
};


const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.updateUser(parseInt(req.params.id), req.body);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const deleted = await UserService.deleteUser(parseInt(req.params.id));
    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
};

export {
  createUser,
  updateUser,
  deleteUser,
  getAllUsers
};
