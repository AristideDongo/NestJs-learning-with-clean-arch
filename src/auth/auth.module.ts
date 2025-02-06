import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
// import { JwtProvider } from './infrastructure/security/jwt-provider';
import { AuthService } from './application/services/auth.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaUserRepository } from './infrastructure/repositories/prisma-user.repository';
import { UserRepository } from './domain/repositories/user.repository';
import { RegisterUseCase } from './application/use-cases/register.use-cases';
import { LoginUseCase } from './application/use-cases/login.use-cases';
import { AuthController } from './interface/controllers/auth.controller';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    AuthService,
    PrismaService,
    PrismaUserRepository,
    { provide: UserRepository, useClass: PrismaUserRepository },
    RegisterUseCase,
    LoginUseCase,
  ],
  exports: [AuthService],
})
export class AuthModule {}
