import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({
    example: 'user@example.com',
    description: "Email de l'utilisateur",
  })
  @IsEmail({}, { message: 'Email invalide' })
  @IsNotEmpty({ message: "L'email est obligatoire" })
  email: string;

  @ApiProperty({ example: 'John', description: "Prénom de l'utilisateur" })
  @IsString({})
  @IsNotEmpty({ message: 'Le prénom est obligatoire' })
  firstName: string;

  @ApiProperty({
    example: 'Doe',
    description: "Nom de famille de l'utilisateur",
  })
  @IsString({})
  @IsNotEmpty({ message: 'Le nom de famille est obligatoire' })
  lastName: string;

  @ApiProperty({
    example: 'password123',
    description: 'Mot de passe (min 8 caractères)',
  })
  @IsString({})
  @MinLength(8, {
    message: 'Le mot de passe doit contenir au moins 8 caractères',
  })
  @IsNotEmpty({ message: 'Le mot de passe est obligatoire' })
  password: string;
}
