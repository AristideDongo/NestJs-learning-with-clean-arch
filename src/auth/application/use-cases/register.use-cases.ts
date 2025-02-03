import { Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { RegisterDto } from '../dtos/register.dto';

@Injectable()
export class RegisterUseCase {
  constructor(private readonly authService: AuthService) {}

  async execute(dto: RegisterDto): Promise<{ token: string }> {
    return this.authService.register(dto);
  }
}
