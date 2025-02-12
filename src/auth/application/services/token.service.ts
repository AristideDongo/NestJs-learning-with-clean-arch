import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

interface JwtPayload {
  sub: string;
}

@Injectable()
export class TokenService {
  constructor(private readonly jwtService: JwtService) {}

  //Generer un token JWT
  generateAccessToken(userId: string, email: string): string {
    return this.jwtService.sign(
      {
        sub: userId,
        email: email,
      },
      {
        expiresIn: '30m',
      },
    );
  }

  //Generer un refresh token JWT
  generateRefreshToken(userId: string): string {
    return this.jwtService.sign(
      {
        sub: userId,
      },
      {
        secret: process.env.JWT_SECRET_REFRESH_KEY,
        expiresIn: '7d',
      },
    );
  }

  //Verifier la validité d'un token JWT
  verifyToken(token: string): JwtPayload {
    try {
      return this.jwtService.verify(token, {
        secret: process.env.JWT_REFRESH_SECRET,
      });
    } catch {
      throw new Error('token invalide');
    }
  }

  //Verifier la validité d'un refresh token JWT
  verifyRefreshToken(token: string): JwtPayload {
    try {
      return this.jwtService.verify(token);
    } catch {
      throw new Error('refresh token invalide');
    }
  }
}
