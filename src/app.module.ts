import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordsController } from './words/words.controller';
import { WordsService } from './words/words.service';

@Module({
  imports: [],
  controllers: [AppController, WordsController],
  providers: [AppService, WordsService],
})
export class AppModule {}
