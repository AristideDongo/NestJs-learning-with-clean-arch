import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import 'dotenv/config';
import { UserAuth } from 'src/auth/domain/entities/user.entity';
import { User } from 'src/users/domain/entities/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: [User, UserAuth],
  synchronize: false,
};
