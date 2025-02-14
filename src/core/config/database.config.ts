import { DataSourceOptions } from 'typeorm';
import { User } from 'src/users/domain/entities/user.entity';
import { UserAuth } from 'src/auth/domain/entities/user.entity';

export const databaseConfig: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User, UserAuth],
  migrations: ['src/migrations/*.ts'],
  synchronize: true,
  ssl: { rejectUnauthorized: false },
};
