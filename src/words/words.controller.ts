import { Controller, Get, Param } from '@nestjs/common';
import { WordsService } from './words.service';
import { first, map } from 'rxjs';
import { ApiParam, ApiTags } from '@nestjs/swagger';

@ApiTags('words')
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
  @ApiParam({
    name: 'length',
    required: true,
    type: 'number',
  })
  getWordByLength(@Param() { length }) {
    return this.wordsService.words(length).pipe(
      map((value) => JSON.stringify(value)),
      map(this.wordsService.responseOk),
      first(),
    );
  }

  @Get('/check/:word')
  @ApiParam({
    name: 'word',
    required: true,
    type: 'string',
  })
  getCheckWord(@Param() { word }) {
    return this.wordsService
      .checkWord(word)
      .pipe(map(this.wordsService.responseOk), first());
  }
}
