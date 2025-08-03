import { config } from 'dotenv';

config({ path: `.env.${process.env.NODE_ENV || 'development'}.local` });

export const { 
  PORT, 
  DATABASE_URI, 
  NODE_ENV, 
  JWT_SECRET, 
  JWT_EXPIRE
} = process.env;