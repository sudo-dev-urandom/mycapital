import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service'; // Assuming you have a UserService
import { User } from '../user/interfaces/user.interface'; // Import the User interface
import { JwtPayload } from '../common/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  validateUser(username: string, password: string): User | null {
    const user = this.userService.findUserByUsername(username, password);
    if (!user) {
      return null;
    }
    return user;
  }

  generateToken(username: string, password: string): string {
    const user = this.validateUser(username, password);

    if (user) {
      const payload = { username: user.username, userId: user.id };
      return this.jwtService.sign(payload);
    }
    return 'Unauthorized';
  }

  refreshAccessToken(refreshToken: string): string {
    const payload = this.jwtService.verify<JwtPayload>(refreshToken, {
      secret: process.env.JWT_SECRET,
    });

    const newPayload = { username: payload.username, userId: payload.userId };
    return this.jwtService.sign(newPayload, {
      secret: process.env.JWT_SECRET,
      expiresIn: '24h',
    });
  }

  validateToken(token: string): JwtPayload {
    return this.jwtService.verify<JwtPayload>(token, {
      secret: process.env.JWT_SECRET,
    });
  }
}
