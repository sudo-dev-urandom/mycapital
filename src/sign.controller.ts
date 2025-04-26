import { Controller, Get } from '@nestjs/common';

@Controller('sign')
export class SignController {
  @Get()
  getHello(): any {
    return { message: 'Sign from Sign!' };
  }
}
