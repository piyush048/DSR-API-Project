import { createClient } from 'redis';
import dotenv from 'dotenv';
import logger from '../utils/logger';
dotenv.config();

export const redisClient = createClient();

redisClient.on('error', (err) =>{
  logger.error('Redis Client Error', err);
} );

redisClient.connect().then(() => {
  console.log('Redis connected');
  logger.info('Redis connected');
}).catch((error) => {
  logger.error('Error connecting to Redis:', error);
});
