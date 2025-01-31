import { ConflictException, Injectable } from '@nestjs/common';
import { IUserRepository } from 'src/users/domain/repositories/user.repository';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from 'src/users/domain/entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class CreateUserUseCase {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(data: CreateUserDto): Promise<User> {
    try {
      //Verifier si l'utilisateur existe déjà
      const existingUser = await this.userRepo.findByEmail(data.email);
      if (existingUser) {
        throw new ConflictException("L'utilisateur existe déjà");
      }
      //Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(data.password, 10);

      //Créer un utilisateur
      const user = new User();
      user.email = data.email;
      user.firstName = data.firstName;
      user.lastName = data.lastName;
      user.password = hashedPassword;
      user.createdAt = new Date();

      //Enregistrer l'utilisateur
      const newUser = await this.userRepo.create(user);

      //Supprimer le mot de passe de l'utilisateur
      delete newUser.password;

      return newUser;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new Error("Impossible de créer l'utilisateur");
    }
  }
}
