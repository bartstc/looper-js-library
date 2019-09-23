import { IsNotArrayException } from './exceptions/IsNotArrayException';
import { ValueIsNullException } from './exceptions/IsNullException';

export class Validator {
  isArray(arr: any): never | void {
    if (!Array.isArray(arr)) {
      throw new IsNotArrayException();
    }
  }

  areArrays(...arrays: any[]): never | void {
    arrays.forEach(arr => this.isArray(arr));
  }

  isNotNull(item: any): never | void {
    if (!item) {
      throw new ValueIsNullException();
    }
  }

  areNotNull(...items: any[]): never | void {
    items.forEach(item => this.isNotNull(item));
  }
}
