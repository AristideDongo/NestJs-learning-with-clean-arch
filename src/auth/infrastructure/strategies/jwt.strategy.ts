import { Strategy } from 'passport-jwt';
import { ExtractJwt, StrategyOptions } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

    if (!jwtFromRequest) {
      throw new Error('JWT token not found');
    }

    const secret = configService.get<string>('JWT_SECRET_KEY');
    if (!secret) {
      throw new Error('JWT_SECRET_KEY is not defined in configuration');
    }

    const options: StrategyOptions = {
      jwtFromRequest: jwtFromRequest,
      secretOrKey: secret,
    };

    super(options);
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  async validate(payload: any) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    return { userId: payload.sub, username: payload.email };
  }
}
