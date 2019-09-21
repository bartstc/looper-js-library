/* Most of the functions comes from Underscore.js library.
  [REMAKE] - my own implementation of functions from Underscore.js
  [CUSTOM] - made by me
*/

interface Map<T> {
  [key: string]: T;
}

export class Looper {
  // [REMAKE] Returns the first element of an array. Passing n will return the first n elements of the array.
  first<T>(arr: T[], amount?: number): T | T[] {
    if (amount) {
      return arr.filter((_, i) => i < amount);
    }

    return arr[0];
  }

  // [REMAKE] Returns the last element of an array. Passing n will return the last n elements of the array.
  last<T>(arr: T[], amount?: number): T | T[] {
    if (amount) {
      return arr.filter((_, i) => i >= arr.length - amount);
    }

    return arr[arr.length - 1];
  }

  // [REMAKE] Flattens a nested array (the nesting can be to any depth). If you pass shallow, the array will only be flattened a single level.
  flatten(arr: any[], shallow: boolean = false): any[] {
    //  ES2019 implementation
    //  if (shallow) return arr.flat();
    //  return arr.flat(Infinity);

    return arr.reduce((flat, toFlatten, _, __) => {
      if (shallow) return flat.concat(toFlatten);

      return flat.concat(
        Array.isArray(toFlatten) ? this.flatten(toFlatten) : toFlatten
      );
    }, []);
  }

  // [REMAKE] Returns a copy of the array with all instances of the values removed.
  without<T>(arr: T[], ...valuesToRemove: T[]): T[] {
    return arr.filter(item => {
      const found = valuesToRemove.includes(item);

      if (!found) return item;
    });
  }

  // [CUSTOM] Returns new array with values that shows up in both arrays.
  same<T>(firstArr: T[], secondArr: T[]): any[] {
    return firstArr.filter(item => secondArr.includes(item));
  }

  // [REMAKE] Returns the values from array that are not present in the other arrays.
  difference<T>(firstArr: T[], secondArr: T[]): any[] {
    return firstArr
      .filter(item => !secondArr.includes(item))
      .concat(secondArr.filter(item => !firstArr.includes(item)));
  }

  // [CUSTOM] Returns new merged array.
  merge(...arraysToMerge: any[]): any[] {
    return arraysToMerge.length === 0 ? [] : [].concat(...arraysToMerge);
  }

  // [CUSTOM] Returns new array with unique values.
  unique<T>(arr: T[]): T[] {
    return [...new Set(arr)];
  }

  // [CUSTOM] Looks through each array, returning new array with unique values.
  uniqueAll(...arrays: any[]): any[] {
    return arrays.length === 0 ? [] : [...new Set(this.merge(...arrays))];
  }

  // [CUSTOM] Convert array into map.
  toMap<T>(arr: T[]): Map<T> {
    return arr.reduce(
      (acc, item, i, _): Map<T> => ({
        ...acc,
        [i]: item
      }),
      {}
    );
  }
}
