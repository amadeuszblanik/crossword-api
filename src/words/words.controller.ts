import { Controller, Get, Param } from '@nestjs/common';
import { WordsService } from './words.service';
import { first, map } from 'rxjs';

@Controller('words')
export class WordsController {
  constructor(private readonly wordsService: WordsService) {}

  @Get('random')
  getRandomWord() {
    return this.wordsService
      .randomWord()
      .pipe(map(this.wordsService.responseOk), first());
  }

  @Get('')
  getWord() {
    return this.wordsService.words().pipe(
      map((value) => JSON.stringify(value)),
      map(this.wordsService.responseOk),
      first(),
    );
  }

  @Get(':length')
  getWordByLength(@Param() { length }) {
    return this.wordsService.words(length).pipe(
      map((value) => JSON.stringify(value)),
      map(this.wordsService.responseOk),
      first(),
    );
  }

  @Get('/check/:word')
  getCheckWord(@Param() { word }) {
    return this.wordsService
      .checkWord(word)
      .pipe(map(this.wordsService.responseOk), first());
  }
}
