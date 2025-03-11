import { User } from '@application/entities/user';
import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET || 'default_jwt_secret';
  private readonly jwtExpiresIn = '24h';

  generateToken(user: User): string {
    const payload = {
      sub: user.id,
      email: user.email,
    };

    return jwt.sign(payload, this.jwtSecret, { expiresIn: this.jwtExpiresIn });
  }

  validateToken(token: string): any {
    try {
      return jwt.verify(token, this.jwtSecret);
    } catch (e) {
      throw new Error('Invalid or expired token');
    }
  }
}