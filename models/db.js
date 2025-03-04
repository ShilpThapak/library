import { Sequelize } from '@sequelize/core';
import { PostgresDialect } from '@sequelize/postgres';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize({
  dialect: PostgresDialect,
  database: process.env.POSTGRES_DB,      
  user: process.env.POSTGRES_USER,          
  password: process.env.POSTGRES_PASSWORD,  
  host: process.env.POSTGRES_HOST,          
  port: process.env.POSTGRES_PORT || 5432,
  ssl: process.env.POSTGRES_SSL === 'true',
});

export default sequelize;
