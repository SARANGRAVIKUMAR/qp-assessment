import 'reflect-metadata';
import express, { Express } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import passport from 'passport';
import { routes } from './routes';
import { initializeDatabase } from './config/database';
import './config/passport';
import * as UserService from './services/UserService';
import { Constants } from './helpers/constants';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

// Routes
app.use('/api', routes);

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: Constants.INTERNAL_SERVER_ERROR });
});

const startServer = async () => {
  try {
    await initializeDatabase();

    console.log('**** creating admin user ****');

    await UserService.seedUser({
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      firstName: process.env.ADMIN_FIRST_NAME,
      lastName: process.env.ADMIN_LAST_NAME,
      role: Constants.ADMIN_ROLE,
    });
    console.log('**** admin user created ****');

    app.listen(port, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
