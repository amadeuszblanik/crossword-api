import { Controller, Get, NotAcceptableException, Param } from '@nestjs/common';
import { GameService } from './game.service';
import { first, map } from 'rxjs';
import { WordsService } from '../words/words.service';
import { decodeBase64 } from '../utils';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('game')
@Controller('game')
export class GameController {
  constructor(
    private gameService: GameService,
    private wordsService: WordsService,
  ) {}

  @Get('start')
  getStart() {
    return this.wordsService
      .randomWord()
      .pipe(map(this.gameService.startGame), first());
  }

  @Get('start/:length')
  @ApiParam({
    name: 'length',
    required: true,
    type: 'number',
  })
  getStartByLength(@Param() { length }) {
    return this.wordsService
      .randomWord(length)
      .pipe(map(this.gameService.startGame), first());
  }

  @Get('check/:word/:userWord')
  @ApiParam({
    name: 'word',
    required: true,
    type: 'string',
    description: 'Needs to be encrypted with base64',
  })
  @ApiParam({
    name: 'userWord',
    required: true,
    type: 'string',
  })
  getCheck(@Param() { word, userWord }) {
    const decodedWord = decodeBase64(word);

    if (userWord.length !== decodedWord.length) {
      throw new NotAcceptableException(
        `Provided word should be ${decodedWord} letters long`,
      );
    }

    if (!/^[a-zA-Z]/gi.test(userWord)) {
      throw new NotAcceptableException(
        `Only alphabetic characters are allowed`,
      );
    }

    return this.wordsService.checkWord(userWord).pipe(
      map((wordExists) =>
        this.gameService.checkWord(wordExists, decodedWord, userWord),
      ),
      first(),
    );
  }
}
