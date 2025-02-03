import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserDto {
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
}
