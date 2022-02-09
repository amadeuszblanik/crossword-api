import { Injectable } from '@nestjs/common';
import { GameStartDto } from '../dto/gameStart.dto';
import { Status } from '../type/status.enum';
import { encodeBase64 } from '../utils';
import { GameCheckDto } from '../dto/gameCheck.dto';
import { Letter } from '../type/letter.enum';

@Injectable()
export class GameService {
  startGame(randomWord: string): GameStartDto {
    return {
      status: Status.Success,
      word: encodeBase64(randomWord),
    };
  }

  checkWord(wordExists: boolean, word: string, userWord: string): GameCheckDto {
    const letters = word.split('').map((letter, idx) => {
      if (!wordExists) {
        return Letter.NotWord;
      }

      if (letter === userWord[idx]) {
        return Letter.Correct;
      } else if (userWord.includes(letter)) {
        return Letter.Occurs;
      }

      return Letter.Wrong;
    });

    return {
      status: Status.Success,
      wordExists,
      letters,
    };
  }
}
