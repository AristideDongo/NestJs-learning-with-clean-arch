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

  async register(
    registerDto: RegisterDto,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // Hashage du mot de passe
    const hashedPassword = await this.hashService.hashPassword(
      registerDto.password,
    );

    // Génération et hashage du token de rafraîchissement
    const refreshToken = this.tokenService.generateRefreshToken(
      crypto.randomUUID(),
    );
    const hashedRefreshToken =
      await this.hashService.hashPassword(refreshToken);

    // Création d'un nouvel utilisateur avec le refresh token hashé
    const user = new UserAuth({
      id: crypto.randomUUID(),
      email: registerDto.email,
      firstName: registerDto.firstName,
      lastName: registerDto.lastName,
      password: hashedPassword,
      refreshToken: hashedRefreshToken,
      createdAt: new Date(),
    });

    const createdUser = await this.userRepository.create(user);
    return {
      accessToken: this.tokenService.generateAccessToken(
        createdUser.id,
        createdUser.email,
      ),
      refreshToken: refreshToken,
    };
  }

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

    // Génération d'un nouveau refresh token et hashage
    const refreshToken = this.tokenService.generateRefreshToken(user.id);
    const hashedRefreshToken =
      await this.hashService.hashPassword(refreshToken);

    // Mise à jour de l'utilisateur avec le nouveau refresh token
    user.refreshToken = hashedRefreshToken;
    await this.userRepository.save(user);

    return {
      accessToken: this.tokenService.generateAccessToken(user.id, user.email),
      refreshToken: refreshToken,
    };
  }

  async refreshTokens(
    refreshToken: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    try {
      const payload = this.tokenService.verifyRefreshToken(refreshToken);
      const user = await this.userRepository.findById(payload.sub);

      if (!user || !user.refreshToken) {
        throw new UnauthorizedException('Token de rafraîchissement invalide');
      }

      // Vérification que le token de rafraîchissement fourni correspond au hash stocké
      const isRefreshTokenValid = await this.hashService.comparePassword(
        refreshToken,
        user.refreshToken,
      );

      if (!isRefreshTokenValid) {
        throw new UnauthorizedException('Token de rafraîchissement invalide');
      }

      // Génération des nouveaux tokens
      const newAccessToken = this.tokenService.generateAccessToken(
        user.id,
        user.email,
      );
      const newRefreshToken = this.tokenService.generateRefreshToken(user.id);

      // Hashage et stockage du nouveau token de rafraîchissement
      user.refreshToken = await this.hashService.hashPassword(newRefreshToken);
      await this.userRepository.save(user);

      return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    } catch {
      throw new UnauthorizedException(
        'Token de rafraîchissement invalide ou expiré',
      );
    }
  }

  // Effacement du token de rafraîchissement lors de la déconnexion
  async logout(userId: string): Promise<void> {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      throw new UnauthorizedException('Utilisateur introuvable');
    }
    user.refreshToken = '';
    await this.userRepository.save(user);
  }
}
