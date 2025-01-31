import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ example: 'johndoe@gmail.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    example: 'password',
    description: 'Le mot de passe doit contenir au moins 8 caractères',
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
