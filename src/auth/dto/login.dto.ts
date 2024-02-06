import { IsEmail, IsString } from 'class-validator';
import { Unique } from 'typeorm';

@Unique(['email'])
export class LoginDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
