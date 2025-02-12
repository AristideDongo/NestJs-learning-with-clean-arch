import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/auth/domain/repositories/user.repository';
import { UserAuth } from 'src/auth/domain/entities/user.entity';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PrismaUserRepository implements UserRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(user: UserAuth): Promise<UserAuth> {
    // Vérification si l'email existe déjà
    const existingUser = await this.prisma.userAuth.findUnique({
      where: { email: user.email },
    });

    if (existingUser) {
      throw new Error("L'email existe déjà");
    }

    // Créer l'utilisateur dans User
    const createdUser = await this.prisma.user.create({
      data: {
        email: user.email,
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });

    // Maintenant, crée l'utilisateur dans UserAuth avec l'userId de l'utilisateur créé
    const createdUserAuth = await this.prisma.userAuth.create({
      data: {
        email: user.email,
        firstName: user.firstName ?? '',
        lastName: user.lastName ?? '',
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        userId: createdUser.id, // Associe l'ID de l'utilisateur créé
      },
    });

    return new UserAuth({
      id: createdUserAuth.id,
      email: createdUserAuth.email,
      firstName: createdUserAuth.firstName ?? undefined,
      lastName: createdUserAuth.lastName ?? undefined,
      password: createdUserAuth.password,
    });
  }

  async findByEmail(email: string): Promise<UserAuth | null> {
    const user = await this.prisma.userAuth.findUnique({ where: { email } });
    if (!user) return null;
    return new UserAuth({
      id: user.id,
      email: user.email,
      firstName: user.firstName ?? undefined,
      lastName: user.lastName ?? undefined,
      password: user.password,
    });
  }

  async findById(id: string): Promise<UserAuth | null> {
    const user = await this.prisma.userAuth.findUnique({ where: { id } });
    if (!user) return null;
    return new UserAuth({
      id: user.id,
      email: user.email,
      firstName: user.firstName ?? undefined,
      lastName: user.lastName ?? undefined,
      password: user.password,
    });
  }
}
