import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service'; // Assuming you have a UserService
import { User } from '../user/interfaces/user.interface'; // Import the User interface
// import { TokenPayload } from 'src/common/interfaces/token-payload.interface';

interface JwtPayload {
  username: string;
  userId: number;
  iat?: number;
  exp?: number;
}

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService, // Inject user service to validate users
  ) {}

  // Method to validate the user
  validateUser(username: string, password: string): User | null {
    const user = this.userService.findUserByUsername(username, password);
    if (!user) {
      return null; // If user not found, return null
    }
    return user; // Return the user object if found
  }

  // Method to generate a token after validating the user
  generateToken(username: string, password: string): string {
    const user = this.validateUser(username, password); // Validate user

    if (user) {
      const payload = { username: user.username, userId: user.id }; // Include more user data as needed
      return this.jwtService.sign(payload); // Return JWT token
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
      expiresIn: '1h',
    });
  }
}
