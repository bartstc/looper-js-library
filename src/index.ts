import { Looper } from './Looper';

const looper = new Looper();

const arr0 = [1, 2, 3];
const arr1 = [1, 2, 3, 4, 5, 6];
const arr2 = [5, [2, 3], [3, 4, [5, 6, [7, 9]]]];
const arr3 = ['Jane', 'Joe'];

const arr = looper.first('dd' as any);
console.log(arr);
