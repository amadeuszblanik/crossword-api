import { Status } from '../type/status.enum';
import { ErrorDto } from './error.dto';

export interface GameStartDtoSuccess {
  status: Status.Success;
  word: string;
}

export type GameStartDto = GameStartDtoSuccess | ErrorDto;
