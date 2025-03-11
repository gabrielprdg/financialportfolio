import { UserRepository } from '@application/protocols/db/user-repository';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from 'src/infra/services/auth.service';
import { HashService } from 'src/infra/services/hash.service';


@Injectable()
export class LoginUser {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authService: AuthService,
    private readonly hashService: HashService,
  ) { }

  async execute(email: string, password: string) {
    const user = await this.userRepository.findByEmail(email);

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