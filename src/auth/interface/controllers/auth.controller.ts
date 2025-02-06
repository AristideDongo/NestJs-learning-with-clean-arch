import { Body, Controller, Post } from '@nestjs/common';
import { LoginDto } from 'src/auth/application/dtos/login.dto';
import { RegisterDto } from 'src/auth/application/dtos/register.dto';
import { LoginUseCase } from 'src/auth/application/use-cases/login.use-cases';
import { RegisterUseCase } from 'src/auth/application/use-cases/register.use-cases';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly registerUseCase: RegisterUseCase,
    private readonly loginUseCase: LoginUseCase,
  ) {}

  //Route pour l'inscription d'un utilisateur
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    console.log('données recues:', dto);
    return this.registerUseCase.execute(dto);
  }

  //Route pour la connexion d'un utilisateur
  @Post('login')
  async login(@Body() dto: LoginDto) {
    return this.loginUseCase.execute(dto);
  }
}
