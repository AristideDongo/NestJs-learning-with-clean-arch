import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TokenService } from 'src/auth/application/services/token.service';

@Injectable()
export class RefreshTokenMiddleware implements NestMiddleware {
  constructor(private readonly tokenService: TokenService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      throw new UnauthorizedException('Token de rafraîchissement manquant');
    }

    try {
      const payload = this.tokenService.verifyRefreshToken(refreshToken);
      req.user = { id: payload.sub }; // Ajoute l'ID de l'utilisateur au request
      next();
    } catch {
      throw new UnauthorizedException('Token de rafraîchissement invalide');
    }
  }
}
