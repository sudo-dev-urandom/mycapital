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
      console.log(error);
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('refresh-token')
  refreshToken(@Body() body: { refreshToken: string }) {
    try {
      const newAccessToken = this.authService.refreshAccessToken(
        body.refreshToken,
      );
      return {
        refreshToken: newAccessToken,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException('Invalid refresh token', HttpStatus.UNAUTHORIZED);
    }
  }

  @Post('validate-token')
  validateToken(@Body() body: { token: string }) {
    try {
      const decoded = this.authService.validateToken(body.token);
      return {
        valid: true,
        payload: decoded,
      };
    } catch {
      return {
        valid: false,
        message: 'Invalid or expired token',
      };
    }
  }
}
