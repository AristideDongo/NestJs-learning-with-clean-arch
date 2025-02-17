import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UnauthorizedException } from '../exceptions/UnauthorizedException';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user: any) {
    if (err || !user) {
      throw new UnauthorizedException('Accès non autorisé');
    }
    return user;
  }
}
