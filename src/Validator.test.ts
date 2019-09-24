import { Validator } from './Validator';

const validator = new Validator();

describe('Validator', () => {
  describe('isNotNull', () => {
    it('should return true if value is not null or undefined', () => {
      const isString = (validator as any).isNotNull('string');
      const isBool = (validator as any).isNotNull(false);
      const isSymbol = (validator as any).isNotNull(Symbol());
      const isObject = (validator as any).isNotNull({});

      expect(isObject).toBeTruthy();
      expect(isString).toBeTruthy();
      expect(isBool).toBeTruthy();
      expect(isSymbol).toBeTruthy();
    });

    it('should return false if value is null or undefined', () => {
      const isNull = (validator as any).isNotNull(null);
      const isUndefined = (validator as any).isNotNull(undefined);

      expect(isNull).toBeFalsy();
      expect(isUndefined).toBeFalsy();
    });
  });

  describe('isStringOrSymbol', () => {
    it('should return true if value is type of string or symbol', () => {
      const isString = (validator as any).isStringOrSymbol('string');
      const isSymbol = (validator as any).isStringOrSymbol(Symbol());

      expect(isString).toBeTruthy();
      expect(isSymbol).toBeTruthy();
    });

    it('should return false if value is not type of string or symbol', () => {
      const isNumber = (validator as any).isStringOrSymbol(5);
      const isObject = (validator as any).isStringOrSymbol({});
      const isArray = (validator as any).isStringOrSymbol([1, 2, 3]);
      const isNull = (validator as any).isStringOrSymbol(null);
      const isUndefined = (validator as any).isStringOrSymbol(undefined);

      expect(isNumber).toBeFalsy();
      expect(isObject).toBeFalsy();
      expect(isArray).toBeFalsy();
      expect(isNull).toBeFalsy();
      expect(isUndefined).toBeFalsy();
    });
  });

  describe('isArray', () => {
    it('should return true if value is an array', () => {
      const isArray = (validator as any).isArray([1, 2, 3]);
      expect(isArray).toBeTruthy();
    });

    it('should return false if value is not an array', () => {
      const isObject = (validator as any).isArray({});
      const isString = (validator as any).isArray('string' as any);
      const isBool = (validator as any).isArray(false);
      const isSymbol = (validator as any).isArray(Symbol());
      const isNull = (validator as any).isArray(null);
      const isUndefined = (validator as any).isArray(undefined);

      expect(isObject).toBeFalsy();
      expect(isString).toBeFalsy();
      expect(isNull).toBeFalsy();
      expect(isBool).toBeFalsy();
      expect(isUndefined).toBeFalsy();
      expect(isSymbol).toBeFalsy();
    });
  });

  describe('areArrays', () => {
    it('should return true if all values are arrays', () => {
      const areArrays = (validator as any).areArrays(
        [1, 2, 3],
        ['John', null],
        [Symbol(), {}]
      );
      expect(areArrays).toBeTruthy();
    });

    it('should return false if at least one argument is not an array', () => {
      const notArrays = (validator as any).areArrays([1, 2, 3], null, false);
      expect(notArrays).toBeFalsy();
    });
  });
});
