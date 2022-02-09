import { Status } from '../type/status.enum';
import { ErrorDto } from './error.dto';
import { Letter } from '../type/letter.enum';

export interface GameCheckDtoSuccess {
  status: Status.Success;
  wordExists: boolean;
  letters: Letter[];
}

export type GameCheckDto = GameCheckDtoSuccess | ErrorDto;
