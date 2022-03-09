
/**
 * Creates an array with a given length, with elements from a factory function.
 * 
 * @param len new array's length.
 * @param factory array element factory.
 * 
 * @example 
 * const arr = makeArray(4, i => i ** 2);
 * console.log(arr); // [1, 4, 9 ,16] 
 */
export const makeArray = <T>(len: number, factory: (index: number) => T): T[] =>
  [...new Array(len).keys()].map(factory);