import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/domain/entities/user.entity';
import { IUserRepository } from 'src/users/domain/repositories/user.repository';
import { Repository } from 'typeorm';

@Injectable()
export class TypeormUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async findById(id: string): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOneBy({ email });
  }

  async update(user: User): Promise<User> {
    return this.userRepository.save(user);
  }

  async delete(id: string): Promise<void> {
    await this.userRepository.delete(id);
  }
}
