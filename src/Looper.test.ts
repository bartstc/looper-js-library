import { Looper } from './Looper';

const arr0 = [1, 2, 3];
const arr1 = [1, 2, 3, 4, 5, 6];
const arr2 = [5, [2, 3], [3, 4, [5, 6, [7, 9]]]];
const arr3 = ['Jane', 'Joe'];
const arr4 = [1, 2, 3, 3, 2, 4];

const looper = new Looper();

describe('first', () => {
  test('should return first element when amount is not provided', () => {
    const res = looper.first(arr1);
    expect(res).toBe(1);
  });

  test('should return first three elements in array when amount is equal to 3', () => {
    const res = looper.first(arr1, 3);
    expect(res).toEqual([1, 2, 3]);
  });
});

describe('last', () => {
  test('should return the last element when amount is not provided', () => {
    const res = looper.last(arr1);
    expect(res).toBe(6);
  });

  test('should return last three elements in array when amount is equal to 3', () => {
    const res = looper.last(arr1, 3);
    expect(res).toEqual([4, 5, 6]);
  });
});

describe('flatten', () => {
  test('should return flattened array when shallow is not provided', () => {
    const res = looper.flatten(arr2);
    expect(res).toEqual([5, 2, 3, 3, 4, 5, 6, 7, 9]);
  });

  test('should return a single level flattened array when shallow is provided', () => {
    const res = looper.flatten(arr2, true);
    expect(res).toEqual([5, 2, 3, 3, 4, [5, 6, [7, 9]]]);
  });
});

describe('without', () => {
  test('should return a copy of an array when values to remove are not provided', () => {
    const res = looper.without(arr1);
    expect(res).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('should return a copy of an array without provided values', () => {
    const res = looper.without(arr1, 3, 4);
    expect(res).toEqual([1, 2, 5, 6]);
  });
});

describe('same', () => {
  test('should return an array with values that shows up in both arrays', () => {
    const res = looper.same(arr0, arr1);
    expect(res).toEqual([1, 2, 3]);
  });
});

describe('difference', () => {
  test('should return the values from array that are not present in the other arrays', () => {
    const res = looper.difference(arr0, arr1);
    expect(res).toEqual([4, 5, 6]);
  });
});

describe('merge', () => {
  test('should return empty array when any arguments are not provided', () => {
    const res = looper.merge();
    expect(res).toEqual([]);
  });

  test('should return new merged array', () => {
    const res = looper.merge(arr0, arr1, arr3);
    expect(res).toEqual([1, 2, 3, 1, 2, 3, 4, 5, 6, 'Jane', 'Joe']);
  });
});

describe('unique', () => {
  test('should return new array with unique values', () => {
    const res = looper.unique(arr4);
    expect(res).toEqual([1, 2, 3, 4]);
  });
});

describe('uniqueAll', () => {
  test('should return empty array when any arguments are not provided', () => {
    const res = looper.uniqueAll();
    expect(res).toEqual([]);
  });

  test('should return new merged array with unique values', () => {
    const res = looper.uniqueAll(arr0, arr1);
    expect(res).toEqual([1, 2, 3, 4, 5, 6]);
  });
});

describe('toMap', () => {
  test('should return converted array into object', () => {
    const res = looper.toMap(arr3);
    expect(res).toEqual({ 0: 'Jane', 1: 'Joe' });
  });
});
