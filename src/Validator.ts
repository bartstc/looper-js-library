export class Validator {
  // tslint:disable-next-line: no-empty
  constructor() {}

  protected isNotNull(value: any): boolean {
    return value === undefined || value === null ? false : true;
  }

  protected isStringOrSymbol(value: any): boolean {
    return typeof value === 'symbol' || typeof value === 'string'
      ? true
      : false;
  }

  protected isArray(value: any): boolean {
    return !Array.isArray(value) ? false : true;
  }

  protected areArrays(...values: any[]): boolean {
    return values.every(value => this.isArray(value));
  }
}
