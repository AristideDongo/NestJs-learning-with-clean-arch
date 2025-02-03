import { Module } from '@nestjs/common';
import { PrismaService } from './infrastructure/database/prisma.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config/typeorm.config';
import { User } from './domain/entities/user.entity';
import { TypeormUserRepository } from './infrastructure/repositories/typeorm-user.repository';
import { CreateUserUseCase } from './applications/use-cases/create-user.use-cases';
import { UserByIdUseCases } from './applications/use-cases/user-by-id.use-cases';
import { AllUserUseCases } from './applications/use-cases/all-user.use-cases';
import { UpdateUserUseCases } from './applications/use-cases/update-user.use-cases';
import { DeleteUserUseCases } from './applications/use-cases/delete-user.use-cases';
import { UserController } from './interface/controllers/user.controller';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [UserController],
  providers: [
    PrismaService,
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
  exports: [PrismaService, CreateUserUseCase],
})
export class UsersModule {}
