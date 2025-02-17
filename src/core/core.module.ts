import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TokenService } from 'src/auth/application/services/token.service';
import { RefreshTokenMiddleware } from './middlewares/refresh-token.middleware';
import { JwtService } from '@nestjs/jwt';

@Module({
  providers: [TokenService, JwtService],
  exports: [TokenService],
})
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RefreshTokenMiddleware).forRoutes('auth/refresh-token');
  }
}
