import { HttpException } from './HttpException';

export class IsNotArrayException extends HttpException {
  constructor() {
    super(400, `Value must be type of array`);
  }
}
