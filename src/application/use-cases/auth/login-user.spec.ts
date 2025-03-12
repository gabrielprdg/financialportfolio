
import { AuthService } from '@infra/services/auth.service';
import { HashService } from '@infra/services/hash.service';
import { User } from '@application/entities/user';
import { UnauthorizedException } from '@nestjs/common';
import { InMemoryUserRepository } from '@test/repositories/in-memory-user-repository';
import { LoginUser } from './login-user';

describe('LoginUser', () => {
  let userRepository: InMemoryUserRepository;
  let authService: AuthService;
  let hashService: HashService;
  let loginUser: LoginUser;

  beforeEach(() => {
    userRepository = new InMemoryUserRepository();
    authService = new AuthService();
    hashService = new HashService();
    loginUser = new LoginUser(userRepository, authService, hashService);

    jest.spyOn(hashService, 'compare').mockResolvedValue(true);
    jest.spyOn(authService, 'generateToken').mockReturnValue('fake-token');
  });

  it('should return a token when credentials are valid', async () => {
    const user = new User({ name: 'Gabriel', email: 'test@example.com', password: 'hashedPassword' });
    await userRepository.create(user);
    const result = await loginUser.execute('test@example.com', 'password123');
    expect(result).toEqual({ token: 'fake-token' });
  });

  it('should throw UnauthorizedException if user is not found', async () => {
    await expect(loginUser.execute('notfound@example.com', 'password123'))
      .rejects
      .toThrow(new UnauthorizedException('Invalid credentials'));
  });

  it('should throw UnauthorizedException if password is incorrect', async () => {
    const user = new User({ name: 'Gabriel', email: 'test@example.com', password: 'hashedPassword' });
    await userRepository.create(user);
    jest.spyOn(hashService, 'compare').mockResolvedValue(false); // Simula senha errada
    await expect(loginUser.execute('test@example.com', 'wrongpassword'))
      .rejects
      .toThrow(new UnauthorizedException('Invalid credentials'));
  });
});
