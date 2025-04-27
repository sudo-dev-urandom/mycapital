import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service'; // Assuming you have a UserService
import { User } from '../user/interfaces/user.interface'; // Import the User interface

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService, // Inject user service to validate users
  ) {}

  // Method to validate the user
  validateUser(username: string): User | null {
    const user = this.userService.findUserByUsername(username);
    if (!user) {
      return null; // If user not found, return null
    }
    return user; // Return the user object if found
  }

  // Method to generate a token after validating the user
  generateToken(username: string): string {
    const user = this.validateUser(username); // Validate user

    if (!user) {
      throw new Error('User not found'); // Throw an error if user is not found
    }

    // If user is valid, generate the token
    const payload = { username: user.username, userId: user.id }; // Include more user data as needed
    return this.jwtService.sign(payload); // Return JWT token
  }
}
