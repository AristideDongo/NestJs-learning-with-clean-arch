import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './application/services/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { UserRepository } from './domain/repositories/user.repository';
import { AuthController } from './interface/controllers/auth.controller';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { TokenService } from './application/services/token.service';
import { HashService } from './application/services/hash.service';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '15m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    AuthService,
    TokenService,
    HashService,
    PrismaService,
    PrismaUserRepository,
    { provide: UserRepository, useClass: PrismaUserRepository },
  ],
  exports: [AuthService],
})
export class AuthModule {}
