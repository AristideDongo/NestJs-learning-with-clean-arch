import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/users/domain/entities/user.entity';
import { IUserRepository } from 'src/users/domain/repositories/user.repository';

@Injectable()
export class UserByIdUseCases {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<User | null> {
    const user = await this.userRepository.findById(id);
    if (user) {
      delete user.password;
    }
    return user;
  }
}
