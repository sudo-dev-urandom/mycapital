import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    // Seed initial users if not exists (only for development)
    this.seedInitialUsers();
  }

  // Seed initial users for development
  private async seedInitialUsers(): Promise<void> {
    const count = await this.userRepository.count();
    if (count === 0) {
      const users = [
        { username: 'john_doe', password: await bcrypt.hash('12345', 10) },
        { username: 'jane_doe', password: await bcrypt.hash('abcdef', 10) },
      ];

      await this.userRepository.save(users);
      console.log('Initial users seeded successfully');
    }
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });
    if (!user) {
      throw new NotFoundException(`User with username ${username} not found`);
    }
    return user;
  }

  // Validate password
  async validatePassword(username: string, password: string): Promise<boolean> {
    if (!username) {
      throw new Error('Username is required');
    }

    try {
      const user = await this.userRepository.findOne({ where: { username } });
      if (user && (await bcrypt.compare(password, user.password))) {
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  // Find user by username and password
  async findUserByUsername(username: string, password: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  // Create new user
  async create(username: string, password: string): Promise<User> {
    // Check if user already exists
    const existingUser = await this.userRepository.findOne({
      where: { username },
    });
    if (existingUser) {
      throw new Error('Username already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = this.userRepository.create({
      username,
      password: hashedPassword,
    });

    return this.userRepository.save(newUser);
  }
}
