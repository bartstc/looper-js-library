import { HttpException } from './HttpException';

export class ValueIsNullException extends HttpException {
  constructor() {
    super(400, `Value can not be undefined or null`);
  }
}
