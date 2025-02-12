import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from 'src/auth/domain/repositories/user.repository';
import { RegisterDto } from '../dtos/register.dto';
import { UserAuth } from 'src/auth/domain/entities/user.entity';
import { LoginDto } from '../dtos/login.dto';
import { TokenService } from './token.service';
import { HashService } from './hash.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly tokenService: TokenService,
    private readonly hashService: HashService,
  ) {}

  // Inscription de l'utilisateur
  async register(
    registerDto: RegisterDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const hashedPassword = await this.hashService.hashPassword(
      registerDto.password,
    );

    const user = new UserAuth({
      id: crypto.randomUUID(),
      email: registerDto.email,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      password: hashedPassword,
      createdAt: new Date(),
    });

    const createdUser = await this.userRepository.create(user);
    return {
      accessToken: this.tokenService.generateAccessToken(
        createdUser.id,
        createdUser.email,
      ),
      refreshToken: this.tokenService.generateRefreshToken(createdUser.id),
    };
  }

  // Connexion d'un utilisateur
  async login(
    dto: LoginDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userRepository.findByEmail(dto.email);

    if (
      !user ||
      !(await this.hashService.comparePassword(dto.password, user.password))
    ) {
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }
    return {
      accessToken: this.tokenService.generateAccessToken(user.id, user.email),
      refreshToken: this.tokenService.generateRefreshToken(user.id),
    };
  }

  // refresh token de l'utilisateur
  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const payload = this.tokenService.verifyRefreshToken(refreshToken);
      const user = await this.userRepository.findById(payload.sub);
      if (!user) {
        throw new UnauthorizedException('');
      }
      return {
        accessToken: this.tokenService.generateAccessToken(user.id, user.email),
      };
    } catch {
      throw new UnauthorizedException('refresh token invalide ou expire');
    }
  }

  //Deconnexion de l'utilisateur
}
