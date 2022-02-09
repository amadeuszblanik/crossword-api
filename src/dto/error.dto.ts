import { Status } from '../type/status.enum';

export interface ErrorDto {
  status: Status.Error;
  message: string;
}
