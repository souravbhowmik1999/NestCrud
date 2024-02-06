import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Unique } from 'typeorm';

@Unique(['email'])
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
