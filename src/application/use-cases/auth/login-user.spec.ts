import { LoginUser } from './login-user';
import { UserRepository } from '@application/protocols/db/user-repository';
import { AuthService } from 'src/infra/services/auth.service';
import { HashService } from 'src/infra/services/hash.service';
import { UnauthorizedException } from '@nestjs/common';

describe('LoginUser', () => {
  let loginUser: LoginUser;
  let userRepository: UserRepository;
  let authService: AuthService;
  let hashService: HashService;

  beforeEach(() => {
    userRepository = {
      findByEmail: jest.fn(),
    } as unknown as UserRepository;

    authService = {
      generateToken: jest.fn(),
    } as unknown as AuthService;

    hashService = {
      compare: jest.fn(),
    } as unknown as HashService;

    loginUser = new LoginUser(userRepository, authService, hashService);
  });

  it('should return a token when credentials are valid', async () => {
    const email = 'test@example.com';
    const password = 'correct-password';
    const hashedPassword = 'hashed-correct-password';
    const user = { email, password: hashedPassword };
    const token = 'generated-token';

    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(user);
    jest.spyOn(hashService, 'compare').mockResolvedValue(true);
    jest.spyOn(authService, 'generateToken').mockReturnValue(token);

    const result = await loginUser.execute(email, password);

    expect(result).toEqual({ token });
    expect(userRepository.findByEmail).toHaveBeenCalledWith(email);
    expect(hashService.compare).toHaveBeenCalledWith(password, hashedPassword);
    expect(authService.generateToken).toHaveBeenCalledWith(user);
  });

  it('should throw UnauthorizedException if user is not found', async () => {
    const email = 'test@example.com';
    const password = 'any-password';

    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(null);

    await expect(loginUser.execute(email, password)).rejects.toThrow(UnauthorizedException);
    await expect(loginUser.execute(email, password)).rejects.toThrow('Invalid credentials');
  });

  it('should throw UnauthorizedException if password is incorrect', async () => {
    const email = 'test@example.com';
    const password = 'incorrect-password';
    const hashedPassword = 'hashed-correct-password';
    const user = { email, password: hashedPassword };

    jest.spyOn(userRepository, 'findByEmail').mockResolvedValue(user);
    jest.spyOn(hashService, 'compare').mockResolvedValue(false);

    await expect(loginUser.execute(email, password)).rejects.toThrow(UnauthorizedException);
    await expect(loginUser.execute(email, password)).rejects.toThrow('Invalid credentials');
  });
});
