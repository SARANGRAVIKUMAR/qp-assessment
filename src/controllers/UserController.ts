import { Request, Response } from 'express';
import * as UserService from '../services/UserService';
import { Constants } from '../helpers/constants';

export {
  signUp,
  login,
  updateUser,
  deleteUser,
  getAllUsers,
  createAdminUser
};

const signUp = async (req: Request, res: Response) => {
  try {
    const { user, token } = await UserService.createUser(req.body);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: Constants.ERROR_CREATING_USER, error });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const result = await UserService.login(email, password);
    if (!result) {
      return res.status(401).json({ message: Constants.INVALID_CREDENTIALS });
    }

    res.json(result);
  } catch (error) {
    res.status(400).json({ message: Constants.ERROR_DURING_LOGIN, error });
  }
};


const createAdminUser = async (req: Request, res: Response) => {
  try {
    const { user, token } = await UserService.createAdminUser(req.body);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: Constants.ERROR_CREATING_USER, error });
  }
};


const updateUser = async (req: Request, res: Response) => {
  try {
    const user = await UserService.updateUser(parseInt(req.params.id), req.body);
    if (!user) {
      return res.status(404).json({ message: Constants.USER_NOT_FOUND });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: Constants.ERROR_UPDATING_USER, error });
  }
};

const deleteUser = async (req: Request, res: Response) => {
  try {
    const deleted = await UserService.deleteUser(parseInt(req.params.id));
    if (!deleted) {
      return res.status(404).json({ message: Constants.USER_NOT_FOUND });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: Constants.ERROR_DELETING_USER, error });
  }
};

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await UserService.getAllUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: Constants.ERROR_FETCHING_USERS, error });
  }
};
