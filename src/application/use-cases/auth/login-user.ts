import { UserRepository } from '@application/protocols/db/user-repository';
import { AuthService } from '@infra/services/auth.service';
import { HashService } from '@infra/services/hash.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';


@Injectable()
export class LoginUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    private readonly hashService: HashService,
  ) { }

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);
    console.log(user)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.hashService.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const token = this.authService.generateToken(user);

    return { token };
  }
}