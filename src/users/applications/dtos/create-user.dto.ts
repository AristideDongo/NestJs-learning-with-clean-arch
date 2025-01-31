import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'johndoe@gmail.com' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @MinLength(3)
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  @MinLength(3)
  lastName: string;

  @ApiProperty({
    example: 'password',
    description: 'Le mot de passe doit contenir au moins 8 caractères',
  })
  @IsNotEmpty()
  @MinLength(8)
  password: string;
}
