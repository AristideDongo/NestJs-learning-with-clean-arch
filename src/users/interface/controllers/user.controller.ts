import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from 'src/users/applications/dtos/create-user.dto';
import { UpdateUserDto } from 'src/users/applications/dtos/update-user.dto';
import { AllUserUseCases } from 'src/users/applications/use-cases/all-user.use-cases';
import { CreateUserUseCase } from 'src/users/applications/use-cases/create-user.use-cases';
import { DeleteUserUseCases } from 'src/users/applications/use-cases/delete-user.use-cases';
import { UpdateUserUseCases } from 'src/users/applications/use-cases/update-user.use-cases';
import { UserByIdUseCases } from 'src/users/applications/use-cases/user-by-id.use-cases';
import { IUserRepository } from 'src/users/domain/repositories/user.repository';

@Controller('users')
export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly userByIdUseCase: UserByIdUseCases,
    private readonly AllUserUseCase: AllUserUseCases,
    private readonly updateUserUseCase: UpdateUserUseCases,
    private readonly deleteUserUseCase: DeleteUserUseCases,
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  //Creation d'un utilisateur
  @Post('create')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.createUserUseCase.execute(createUserDto);
    return plainToInstance(CreateUserDto, user);
  }

  //Recuperation de tous les utilisateurs
  @Get('all')
  async getAllUsers() {
    const findAll = await this.AllUserUseCase.execute();
    return findAll;
  }

  //Recuperation d'un utilisateur par son id
  @Get(':id')
  async getUserById(@Param('id') id: string) {
    const findById = await this.userByIdUseCase.execute(id);
    return findById;
  }

  //Mise a jour d'un utilisateur
  @Put('update/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updateUser = await this.updateUserUseCase.execute(id, updateUserDto);
    return updateUser;
  }

  //Suppression d'un utilisateur
  @Delete('delete/:id')
  async deleteUser(@Param('id') id: string) {
    await this.deleteUserUseCase.execute(id);
    return 'Utilisateur supprimé';
  }
}
