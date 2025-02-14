import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './application/services/auth.service';
import { UserRepository } from './domain/repositories/user.repository';
import { AuthController } from './interface/controllers/auth.controller';
import { JwtStrategy } from './infrastructure/strategies/jwt.strategy';
import { TokenService } from './application/services/token.service';
import { HashService } from './application/services/hash.service';
import { AuthUserRepository } from './infrastructure/repositories/user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuth } from './domain/entities/user.entity';
import { AppDataSource } from 'typeorm.config';

@Module({
  imports: [
    ConfigModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET_KEY,
      signOptions: { expiresIn: '15m' },
    }),
    TypeOrmModule.forRoot(AppDataSource.options),
    TypeOrmModule.forFeature([UserAuth]),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    AuthService,
    TokenService,
    HashService,
    { provide: UserRepository, useClass: AuthUserRepository },
  ],
  exports: [AuthService],
})
export class AuthModule {}
