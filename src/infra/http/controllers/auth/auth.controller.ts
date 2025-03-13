import { LoginUser } from "@application/use-cases/auth/login-user";
import { RegisterUser } from "@application/use-cases/auth/register-user";
import { LoginUserBody } from "@infra/http/dtos/login-user-body";
import { RegisterUserBody } from "@infra/http/dtos/register-user-body";
import { UserViewModel } from "@infra/http/view-model/user-view-model";
import { Body, Controller, Logger, Post } from "@nestjs/common";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private readonly loginUser: LoginUser,
    private readonly registerUser: RegisterUser,
  ) { }

  @Post('register')
  @ApiOperation({ summary: 'Register an user' })
  @ApiResponse({ status: 200, description: 'User registered' })
  @ApiResponse({ status: 409, description: 'This user already exists' })
  async register(@Body() body: RegisterUserBody) {
    this.logger.log('[POST] /register');
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
  @ApiOperation({ summary: 'API Authentication' })
  @ApiResponse({ status: 200, description: 'Auhtenticated user' })
  async login(@Body() body: LoginUserBody) {
    this.logger.log('[POST] /login');
    const { email, password } = body;

    const { token } = await this.loginUser.execute(email, password);

    return { token };
  }
}