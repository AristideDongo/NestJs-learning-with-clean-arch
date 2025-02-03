import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/users/domain/repositories/user.repository';

@Injectable()
export class DeleteUserUseCases {
  constructor(
    @Inject('IUserRepository')
    private readonly userRepository: IUserRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new Error("L'utilisateur n'existe pas");
    }
    await this.userRepository.delete(id);
  }
}
