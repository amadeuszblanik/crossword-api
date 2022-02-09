import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WordsController } from './words/words.controller';
import { WordsService } from './words/words.service';
import { GameController } from './game/game.controller';
import { GameService } from './game/game.service';

@Module({
  imports: [],
  controllers: [AppController, WordsController, GameController],
  providers: [AppService, WordsService, GameService],
})
export class AppModule {}
