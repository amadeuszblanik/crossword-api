import { Status } from '../type/status.enum';

export interface WordsResponseDto {
  status: Status;
  results: string | boolean;
}
