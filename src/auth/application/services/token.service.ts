import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/auth/domain/repositories/user.repository';
import { UnauthorizedException } from 'src/core/exceptions/UnauthorizedException';

interface JwtPayload {
  sub: string;
}

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userRepository: UserRepository,
  ) {}

  // Générer un accessToken
  generateAccessToken(userId: string, email: string): string {
    return this.jwtService.sign(
      { sub: userId, email },
      { expiresIn: '30m', secret: process.env.JWT_SECRET },
    );
  }

  // Générer un refreshToken
  generateRefreshToken(userId: string): string {
    return this.jwtService.sign(
      { sub: userId },
      { secret: process.env.JWT_REFRESH_SECRET, expiresIn: '7d' },
    );
  }

  // Vérifier un accessToken
  verifyToken(token: string): JwtPayload {
    try {
      return this.jwtService.verify(token, { secret: process.env.JWT_SECRET });
    } catch {
      throw new Error('Token invalide');
    }
  }

  // Vérifier un refreshToken
  verifyRefreshToken(token: string): JwtPayload {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch {
      throw new Error('Refresh token invalide');
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
