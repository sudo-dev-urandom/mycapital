import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User } from './interfaces/user.interface'; // Import User interface

@Injectable()
export class UserService {
  private users: User[] = [
    { id: 1, username: 'john_doe', password: bcrypt.hashSync('12345', 10) },
    { id: 2, username: 'jane_doe', password: bcrypt.hashSync('abcdef', 10) },
  ];

  // Validate password (synchronous)

  validatePassword(username: string, password: string): boolean {
    if (!username) {
      throw new Error('Username is required'); // Handle case when username is undefined or empty
    }

    const user = this.users.find((user) => user.username === username);
    if (user && bcrypt.compareSync(password, user.password)) {
      return true;
    }
    return false;
  }

  // Find user by username (synchronous)
  findUserByUsername(username: string): User | undefined {
    return this.users.find((user) => user.username === username);
  }
}
