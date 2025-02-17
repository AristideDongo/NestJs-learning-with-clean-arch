import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from 'src/auth/domain/repositories/user.repository';
import { UserAuth } from 'src/auth/domain/entities/user.entity';

@Injectable()
export class AuthUserRepository implements UserRepository {
  constructor(
    @InjectRepository(UserAuth)
    private readonly userRepository: Repository<UserAuth>,
  ) {}

  async create(user: UserAuth): Promise<UserAuth> {
    // Vérification si l'email existe déjà
    const existingUser = await this.userRepository.findOne({
      where: { email: user.email },
    });

    if (existingUser) {
      throw new Error("L'email existe déjà");
    }

    // Création de l'utilisateur avec TypeORM
    const newUser = this.userRepository.create(user);
    return await this.userRepository.save(newUser);
  }

  async findByEmail(email: string): Promise<UserAuth | null> {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<UserAuth | null> {
    return await this.userRepository.findOne({ where: { id } });
  }

  async update(user: UserAuth): Promise<UserAuth> {
    return await this.userRepository.save(user);
  }

  async save(user: UserAuth): Promise<UserAuth> {
    return await this.userRepository.save(user);
  }
}
