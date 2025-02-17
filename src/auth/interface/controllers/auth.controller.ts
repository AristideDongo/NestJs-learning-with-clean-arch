import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { LoginDto } from 'src/auth/application/dtos/login.dto';
import { RefreshTokenDto } from 'src/auth/application/dtos/refresh-token.dto';
import { RegisterDto } from 'src/auth/application/dtos/register.dto';
import { AuthService } from 'src/auth/application/services/auth.service';
import { TokenService } from 'src/auth/application/services/token.service';
import { JwtAuthGuard } from 'src/core/guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {}

  //Route pour l'inscription d'un utilisateur
  @Post('register')
  async register(@Body() dto: RegisterDto) {
    const registedUser = await this.authService.register(dto);
    return registedUser;
  }

  //Route pour la connexion d'un utilisateur
  @Post('login')
  async login(@Body() dto: LoginDto) {
    const loginUser = await this.authService.login(dto);
    return loginUser;
  }

  //Route pour le refresh token d'un utilisateur
  @Post('refresh-token')
  @UseGuards(JwtAuthGuard)
  async refreshToken(@Body() dto: RefreshTokenDto) {
    const refreshToken = await this.authService.refreshTokens(dto.refreshToken);
    return refreshToken;
  }

  //Route pour la deconnexion d'un utilisateur
  @Post('logout')
  @UseGuards(JwtAuthGuard)
  async logout(@Body() dto: RefreshTokenDto) {
    const logoutUser = await this.authService.logout(dto.refreshToken);
    return logoutUser;
  }
}
