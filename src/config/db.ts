import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import logger from '../utils/logger';
dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME!,
  process.env.DB_USER!,
  process.env.DB_PASSWORD!,
  {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'postgres',
    logging: false
  }
);


export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log('Database connected successfully.');
    logger.info('Database connected successfully.');
  } catch (error) {
    logger.error('Unable to connect to the database:', error);
  }
};
