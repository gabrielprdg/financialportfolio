import { LoginUser } from "@application/use-cases/auth/login-user";
import { RegisterUser } from "@application/use-cases/auth/register-user";
import { LoginUserBody } from "@infra/http/dtos/login-user-body";
import { RegisterUserBody } from "@infra/http/dtos/register-user-body";
import { UserViewModel } from "@infra/http/view-model/user-view-model";
import { Body, Controller, Post } from "@nestjs/common";

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUser: LoginUser,
    private readonly registerUser: RegisterUser,
  ) { }

  @Post('register')
  async register(@Body() body: RegisterUserBody) {
    const { name, email, password, balance } = body;

    const { user } = await this.registerUser.execute({
      name,
      email,
      password,
      balance
    });

    return UserViewModel.toHTTP(user);
  }

  @Post('login')
  async login(@Body() body: LoginUserBody) {
    const { email, password } = body;

    const { token } = await this.loginUser.execute(email, password);

    return { token };
  }
}