import * as fs from 'fs';
import * as path from 'path';
import {
  BadRequestException,
  Injectable,
  NotAcceptableException,
} from '@nestjs/common';
import { randomElement } from 'bme-utils';
import { BehaviorSubject, map } from 'rxjs';
import { WordsListDto } from '../dto/wordsList.dto';
import { Status } from '../type/status.enum';
import { WordsResponseDto } from '../dto/wordsResponse.dto';

const DEFAULT_WORD_LENGTH = 5;
const MAX_ALLOWED_LENGTH = 10;
const MIN_ALLOWED_LENGTH = 4;

@Injectable()
export class WordsService {
  private wordsLists$ = new BehaviorSubject<string[]>([]);

  constructor() {
    this.readFile();
  }

  private readFile(): void {
    const filePath = path.join(__dirname, `../../assets/words_dictionary.json`);

    fs.readFile(filePath, 'utf8', (readError, data) => {
      if (readError) {
        throw new BadRequestException(readError);
      }

      try {
        const json = JSON.parse(data) as WordsListDto;
        const wordsLists = Object.keys(json).filter(
          (word) =>
            word.length >= MIN_ALLOWED_LENGTH &&
            word.length <= MAX_ALLOWED_LENGTH,
        );
        this.wordsLists$.next(wordsLists);
      } catch (transformErr) {
        throw new BadRequestException(transformErr);
      }
    });
  }

  words(length = DEFAULT_WORD_LENGTH) {
    if (!this.wordsLists$.value) {
      this.readFile();
    }

    if (length > MAX_ALLOWED_LENGTH) {
      throw new NotAcceptableException(
        `Length cannot be larger than ${MAX_ALLOWED_LENGTH}.`,
      );
    }

    if (length < MIN_ALLOWED_LENGTH) {
      throw new NotAcceptableException(
        `Length cannot be smaller than ${MIN_ALLOWED_LENGTH}.`,
      );
    }

    return this.wordsLists$
      .asObservable()
      .pipe(
        map((wordsList) =>
          wordsList.filter((word) => word.length === Number(length)),
        ),
      );
  }

  randomWord(length = DEFAULT_WORD_LENGTH) {
    if (!this.wordsLists$.value) {
      this.readFile();
    }

    if (length > MAX_ALLOWED_LENGTH) {
      throw new NotAcceptableException(
        `Length cannot be larger than ${MAX_ALLOWED_LENGTH}.`,
      );
    }

    if (length < MIN_ALLOWED_LENGTH) {
      throw new NotAcceptableException(
        `Length cannot be smaller than ${MIN_ALLOWED_LENGTH}.`,
      );
    }

    return this.wordsLists$.asObservable().pipe(
      map((wordsList) => {
        const allowedWordsList = wordsList.filter(
          (word) => word.length === Number(length),
        );

        return randomElement(allowedWordsList);
      }),
    );
  }

  checkWord(lookingWord: string) {
    if (!this.wordsLists$.value) {
      this.readFile();
    }

    return this.wordsLists$.asObservable().pipe(
      map((wordsList) => {
        const wordFound = wordsList.find(
          (word) => word.toLowerCase() === lookingWord.toLowerCase(),
        );

        return Boolean(wordFound);
      }),
    );
  }

  responseOk(results): WordsResponseDto {
    return {
      status: Status.Success,
      results,
    };
  }
}
