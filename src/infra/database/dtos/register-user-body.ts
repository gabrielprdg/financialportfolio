import { IsNotEmpty, Length, IsEmail } from 'class-validator';

export class RegisterUserBody {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(5, 200)
  email: string;

  @IsNotEmpty()
  password: string;
}