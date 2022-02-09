import { Module } from '@nestjs/common';
import { WordsController } from './words/words.controller';
import { WordsService } from './words/words.service';
import { GameController } from './game/game.controller';
import { GameService } from './game/game.service';

@Module({
  imports: [],
  controllers: [WordsController, GameController],
  providers: [WordsService, GameService],
})
export class AppModule {}
