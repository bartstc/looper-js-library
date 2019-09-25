import { Looper } from './Looper';

const arr0 = [1, 2, 3];
const arr1 = [1, 2, 3, 4, 5, 6];
const arr2 = [5, [2, 3], [3, 4, [5, 6, [7, 9]]]];
const arr3 = ['Jane', 'Joe'];
const arr4 = [1, 2, 3, 3, 2, 4];

const looper = new Looper();

describe('native looper methods', () => {
  describe('first', () => {
    it('should return first element when amount is not provided', () => {
      const res = looper.first(arr1);
      expect(res).toBe(1);
    });

    it('should return first three elements in array when amount is equal to 3', () => {
      const res = looper.first(arr1, 3);
      expect(res).toEqual([1, 2, 3]);
    });
  });

  describe('last', () => {
    it('should return the last element when amount is not provided', () => {
      const res = looper.last(arr1);
      expect(res).toBe(6);
    });

    it('should return last three elements in array when amount is equal to 3', () => {
      const res = looper.last(arr1, 3);
      expect(res).toEqual([4, 5, 6]);
    });
  });

  describe('flatten', () => {
    it('should return flattened array when shallow is not provided', () => {
      const res = looper.flatten(arr2);
      expect(res).toEqual([5, 2, 3, 3, 4, 5, 6, 7, 9]);
    });

    it('should return a single level flattened array when shallow is provided', () => {
      const res = looper.flatten(arr2, true);
      expect(res).toEqual([5, 2, 3, 3, 4, [5, 6, [7, 9]]]);
    });
  });

  describe('without', () => {
    it('should return a copy of an array when values to remove are not provided', () => {
      const res = looper.without(arr1);
      expect(res).toEqual([1, 2, 3, 4, 5, 6]);
    });

    it('should return a copy of an array without provided values', () => {
      const res = looper.without(arr1, 3, 4);
      expect(res).toEqual([1, 2, 5, 6]);
    });
  });

  describe('same', () => {
    it('should return an array with values that shows up in both arrays', () => {
      const res = looper.same(arr0, arr1);
      expect(res).toEqual([1, 2, 3]);
    });
  });

  describe('difference', () => {
    it('should return the values from array that are not present in the other arrays', () => {
      const res = looper.difference(arr0, arr1);
      expect(res).toEqual([4, 5, 6]);
    });
  });

  describe('merge', () => {
    it('should return empty array when any arguments are not provided', () => {
      const res = looper.merge();
      expect(res).toEqual([]);
    });

    it('should return new merged array', () => {
      const res = looper.merge(arr0, arr1, arr3);
      expect(res).toEqual([1, 2, 3, 1, 2, 3, 4, 5, 6, 'Jane', 'Joe']);
    });
  });

  describe('unique', () => {
    it('should return new array with unique values', () => {
      const res = looper.unique(arr4);
      expect(res).toEqual([1, 2, 3, 4]);
    });
  });

  describe('uniqueAll', () => {
    it('should return empty array when any arguments are not provided', () => {
      const res = looper.uniqueAll();
      expect(res).toEqual([]);
    });

    it('should return new merged array with unique values', () => {
      const res = looper.uniqueAll(arr0, arr1);
      expect(res).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('toMap', () => {
    it('should return empty object when array is empty', () => {
      const res = looper.toMap([]);
      expect(res).toEqual({});
    });

    it('should return converted array into object', () => {
      const res = looper.toMap(arr3);
      expect(res).toEqual({ 0: 'Jane', 1: 'Joe' });
    });
  });

  describe('object', () => {
    it('should return empty object when first argument is empty array', () => {
      const res = looper.object([]);
      expect(res).toEqual({});
    });

    describe('provided second argument', () => {
      it('should return empty object when second argument is empty array', () => {
        const res = looper.object([1, 2, 3], []);
        expect(res).toEqual({});
      });

      it('should return undefined when lengths of provided arrays are not equal', () => {
        const res = looper.object(['a', 'aa', 'aaa'], [1, 2]);
        expect(res).toBeUndefined();
      });

      it('should return undefined when at least one element in first array is not a type of string or symbol', () => {
        const res = looper.object(['a', 2, Symbol('foo')], [1, 2, 3]);
        expect(res).toBeUndefined();
      });

      it('should return an object with keys that matches first array elements and values that matches second array elements', () => {
        const res = looper.object(
          ['firstname', 'lastname', 'age'],
          ['John', 'Doe', 45]
        );
        expect(res).toEqual({
          firstname: 'John',
          lastname: 'Doe',
          age: 45
        });
      });
    });

    describe('second argument not provided', () => {
      it('should return undefined when at least one element in array is not array', () => {
        const res = looper.object([[1, 'foo'], ['foo', 1], 'string']);
        expect(res).toBeUndefined();
      });

      it('should return undefined when at least one element`s length in first array is not equal to 2', () => {
        const res = looper.object([[1, 'foo'], ['foo', 1], [1, 2, 3]]);
        expect(res).toBeUndefined();
      });

      it('should return undefined when at least one element(array) in first array contains an element at first index which is not string or symbol', () => {
        const res = looper.object([
          ['firstname', 'John'],
          ['lastname', 'Doe'],
          [1, [45]]
        ]);
        expect(res).toBeUndefined();
      });

      it('should return an object with keys that matches first item in each array and values that matches second item in iche array inside first array', () => {
        const res = looper.object([
          ['firstname', 'John'],
          ['lastname', 'Doe'],
          ['age', 45]
        ]);
        expect(res).toEqual({
          firstname: 'John',
          lastname: 'Doe',
          age: 45
        });
      });
    });
  });
});

describe('validation helpers', () => {
  describe('isNotNull', () => {
    it('should return true if value is not null or undefined', () => {
      const isString = (looper as any).isNotNull('string');
      const isBool = (looper as any).isNotNull(false);
      const isSymbol = (looper as any).isNotNull(Symbol());
      const isObject = (looper as any).isNotNull({});

      expect(isObject).toBeTruthy();
      expect(isString).toBeTruthy();
      expect(isBool).toBeTruthy();
      expect(isSymbol).toBeTruthy();
    });

    it('should return false if value is null or undefined', () => {
      const isNull = (looper as any).isNotNull(null);
      const isUndefined = (looper as any).isNotNull(undefined);

      expect(isNull).toBeFalsy();
      expect(isUndefined).toBeFalsy();
    });
  });

  describe('isStringOrSymbol', () => {
    it('should return true if value is type of string or symbol', () => {
      const isString = (looper as any).isStringOrSymbol('string');
      const isSymbol = (looper as any).isStringOrSymbol(Symbol());

      expect(isString).toBeTruthy();
      expect(isSymbol).toBeTruthy();
    });

    it('should return false if value is not type of string or symbol', () => {
      const isNumber = (looper as any).isStringOrSymbol(5);
      const isObject = (looper as any).isStringOrSymbol({});
      const isArray = (looper as any).isStringOrSymbol([1, 2, 3]);
      const isNull = (looper as any).isStringOrSymbol(null);
      const isUndefined = (looper as any).isStringOrSymbol(undefined);

      expect(isNumber).toBeFalsy();
      expect(isObject).toBeFalsy();
      expect(isArray).toBeFalsy();
      expect(isNull).toBeFalsy();
      expect(isUndefined).toBeFalsy();
    });
  });

  describe('isArray', () => {
    it('should return true if value is an array', () => {
      const isArray = (looper as any).isArray([1, 2, 3]);
      expect(isArray).toBeTruthy();
    });

    it('should return false if value is not an array', () => {
      const isObject = (looper as any).isArray({});
      const isString = (looper as any).isArray('string' as any);
      const isBool = (looper as any).isArray(false);
      const isSymbol = (looper as any).isArray(Symbol());
      const isNull = (looper as any).isArray(null);
      const isUndefined = (looper as any).isArray(undefined);

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
      const areArrays = (looper as any).areArrays(
        [1, 2, 3],
        ['John', null],
        [Symbol(), {}]
      );
      expect(areArrays).toBeTruthy();
    });

    it('should return false if at least one argument is not an array', () => {
      const notArrays = (looper as any).areArrays([1, 2, 3], null, false);
      expect(notArrays).toBeFalsy();
    });
  });
});
