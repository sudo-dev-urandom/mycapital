import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { SignController } from './sign.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController, SignController],
  providers: [AppService],
})
export class AppModule {}
