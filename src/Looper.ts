interface Map<T> {
  [key: string]: T;
}

export class Looper {
  // Returns the first element of an array. Passing n will return the first n elements of the array.
  first<T>(arr: T[], amount?: number): T | T[] {
    if (amount) {
      return arr.filter((_, i) => i < amount);
    }

    return arr[0];
  }

  // Returns the last element of an array. Passing n will return the last n elements of the array.
  last<T>(arr: T[], amount?: number): T | T[] {
    if (amount) {
      return arr.filter((_, i) => i >= arr.length - amount);
    }

    return arr[arr.length - 1];
  }

  // Flattens a nested array (the nesting can be to any depth). If you pass shallow, the array will only be flattened a single level.
  flatten(arr: any[], shallow: boolean = false): any[] {
    return arr.reduce((flat, toFlatten, _, __) => {
      if (shallow) return flat.concat(toFlatten);

      return flat.concat(
        Array.isArray(toFlatten) ? this.flatten(toFlatten) : toFlatten
      );
    }, []);
  }
  // flatten(arr: any[], shallow: boolean = false): any[] {
  //   if (shallow) return arr.flat();
  //   return arr.flat(Infinity);
  // }

  // Returns a copy of the array with all instances of the values removed.
  without<T>(arr: T[], ...valuesToRemove: T[]): T[] {
    return arr.filter(item => {
      const found = valuesToRemove.includes(item);

      if (!found) return item;
    });
  }

  // Returns new array with values that shows up in both arrays.
  same<T>(firstArr: T[], secondArr: T[]): any[] {
    return firstArr.filter(item => {
      const found = secondArr.includes(item);

      if (found) return item;
    });
  }

  // Returns the values from array that are not present in the other arrays.
  difference<T>(firstArr: T[], secondArr: T[]): any[] {
    return firstArr.filter(item => {
      const found = secondArr.includes(item);

      if (!found) return item;
    });
  }

  // Returns new merged array.
  merge(...arraysToMerge: any[]): any[] {
    return [].concat(...arraysToMerge);
  }

  // Returns new array with unique values.
  unique<T>(arr: T[]): T[] {
    return [...new Set(arr)];
  }

  // Looks through each array, returning new array with unique values.
  uniqueAll(...arrays: any[]): any[] {
    return [...new Set(this.merge(...arrays))];
  }

  // Convert array into map.
  toMap<T>(arr: T[]): Map<T> {
    return arr.reduce(
      (acc, item, i, _): Map<T> => ({
        ...acc,
        [i]: item
      }),
      {}
    );
  }

  // Converts arrays into objects. Pass either a single list of [key, value] pairs, or a list of keys, and a list of values. Passing by pairs is the reverse of pairs. If duplicate keys exist, the last value wins.
  // object(firstArr: any[] | any[][], secondArray?: any[]): Map<any> {}
}
