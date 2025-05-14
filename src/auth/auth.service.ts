import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import { JwtPayload } from '../common/interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ConfigService,
  ) {}

  async validateUser(username: string, password: string): Promise<User | null> {
    try {
      const user = await this.userService.findUserByUsername(
        username,
        password,
      );
      return user;
    } catch {
      return null;
    }
  }

  async generateToken(username: string, password: string): Promise<string> {
    try {
      const user = await this.validateUser(username, password);

      if (user) {
        const payload = { username: user.username, userId: user.id };
        return this.jwtService.sign(payload);
      }
      throw new UnauthorizedException('Invalid credentials');
    } catch {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  refreshAccessToken(refreshToken: string): string {
    try {
      const payload = this.jwtService.verify<JwtPayload>(refreshToken, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      const newPayload = { username: payload.username, userId: payload.userId };
      return this.jwtService.sign(newPayload, {
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: '24h',
      });
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }

  validateToken(token: string): JwtPayload {
    try {
      return this.jwtService.verify<JwtPayload>(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
  }

  // New method for user registration
  async register(
    username: string,
    password: string,
  ): Promise<{ user: User; token: string }> {
    try {
      const user = await this.userService.create(username, password);
      const payload = { username: user.username, userId: user.id };
      const token = this.jwtService.sign(payload);

      return { user, token };
    } catch (error) {
      if (error.message === 'Username already exists') {
        throw new UnauthorizedException('Username already exists');
      }
      throw new UnauthorizedException('Registration failed');
    }
  }
}
