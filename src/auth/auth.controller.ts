import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('generate-token')
  generateToken(@Body() body: { username: string; password: string }) {
    try {
      const token = this.authService.generateToken(
        body.username,
        body.password,
      );
      return {
        token: token,
      };
    } catch (error) {
      // Return Unauthorized if user is not found
      console.log(error);
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }
}
