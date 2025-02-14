import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './domain/entities/user.entity';
import { TypeormUserRepository } from './infrastructure/repositories/typeorm-user.repository';
import { CreateUserUseCase } from './applications/use-cases/create-user.use-cases';
import { UserByIdUseCases } from './applications/use-cases/user-by-id.use-cases';
import { AllUserUseCases } from './applications/use-cases/all-user.use-cases';
import { UpdateUserUseCases } from './applications/use-cases/update-user.use-cases';
import { DeleteUserUseCases } from './applications/use-cases/delete-user.use-cases';
import { UserController } from './interface/controllers/user.controller';
import { AppDataSource } from 'typeorm.config';

@Module({
  imports: [
    TypeOrmModule.forRoot(AppDataSource.options),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [
    {
      provide: 'IUserRepository',
      useClass: TypeormUserRepository,
    },
    CreateUserUseCase,
    UserByIdUseCases,
    AllUserUseCases,
    UpdateUserUseCases,
    DeleteUserUseCases,
  ],
  exports: [],
})
export class UsersModule {}
