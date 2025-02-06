import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/auth/domain/repositories/user.repository';
import { RegisterDto } from '../dtos/register.dto';
import * as bcrypt from 'bcrypt';
import { UserAuth } from 'src/auth/domain/entities/user.entity';
import { LoginDto } from '../dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  // Inscription de l'utilisateur
  async register(registerDto: RegisterDto): Promise<{ token: string }> {
    const hashedPassword = await bcrypt.hash(registerDto.password, 20);

    const user = new UserAuth({
      id: crypto.randomUUID(),
      email: registerDto.email,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      password: hashedPassword,
      createdAt: new Date(),
    });

    const createdUser = await this.userRepository.create(user);
    const token = this.generateToken(createdUser);

    return { token };
  }

  // Connexion d'un utilisateur
  async login(dto: LoginDto): Promise<{ token: string }> {
    const user = await this.userRepository.findByEmail(dto.email);

    if (!user || !(await bcrypt.compare(dto.password, user.password))) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    const token = this.generateToken(user);
    return { token };
  }

  // Générer un token JWT
  private generateToken(user: UserAuth): string {
    return this.jwtService.sign({
      sub: user.id,
      email: user.email,
    });
  }
}
