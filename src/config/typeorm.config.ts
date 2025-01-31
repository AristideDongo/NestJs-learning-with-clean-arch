import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { User } from 'src/users/domain/entities/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User],
  synchronize: true,
};
