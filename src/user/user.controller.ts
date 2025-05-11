import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('get-all-user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return this.userService.findAll();
  }
}
