import 'dotenv/config';
import { databaseConfig } from 'src/core/config/database.config';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource(databaseConfig);
