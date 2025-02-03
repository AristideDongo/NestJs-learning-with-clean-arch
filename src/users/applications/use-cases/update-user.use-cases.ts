import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/users/domain/repositories/user.repository';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User } from 'src/users/domain/entities/user.entity';

@Injectable()
export class UpdateUserUseCases {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error("L'utilisateur n'existe pas");
    }
    const updateUser = { ...existingUser, ...updateUserDto };
    return await this.userRepository.update(updateUser);
  }
}
