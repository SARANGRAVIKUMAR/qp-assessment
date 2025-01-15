import { Request, Response, NextFunction } from 'express';
import * as UserService from '../services/UserService';
import passport from 'passport';
import { User } from '@/entities/User';
import { Constants } from '../helpers/constants';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).json({
      message: Constants.UNAUTHORIZED_ACCESS
    });
  }

  passport.authenticate('jwt', { session: false }, (err: any, user: any, info: any) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res.status(401).json({
        message: info ? info.message : Constants.INVALID_TOKEN
      });
    }

    req.user = user;
    next();
  })(req, res, next);
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userDetails = req.user as User | undefined;

    if (!userDetails) {
      return res.status(401).json({
        message: Constants.UNAUTHORIZED_ACCESS
      });
    }

    if (userDetails.role !== Constants.ADMIN_ROLE) {
      return res.status(401).json({
        message: Constants.ADMIN_ACCESS_DENIED
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};
