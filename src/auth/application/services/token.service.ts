import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface JwtPayload {
  sub: string;
}

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

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
}
