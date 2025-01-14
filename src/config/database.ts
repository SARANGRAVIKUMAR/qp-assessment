import { DataSource, createConnection } from 'typeorm';
import { join } from 'path';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3006'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [join(__dirname, '../entities/**/*.{ts,js}')],
  migrations: [join(__dirname, '../migrations/**/*.{ts,js}')],
  synchronize: true
});

export const initializeDatabase = async () => {
  try {
    // First create the database if it doesn't exist
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '3006'),
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    await connection.end();

    // Initialize TypeORM connection
    await AppDataSource.initialize();
    console.log('✅ Database connection established successfully');
    
    if (process.env.NODE_ENV === 'development') {
      console.log('🔧 Database schema synchronized (tables created/updated)');
    }
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    process.exit(1);
  }
};
