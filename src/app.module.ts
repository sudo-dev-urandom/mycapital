import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SignController } from './sign.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AppController, SignController],
  providers: [AppService],
})
export class AppModule {}
