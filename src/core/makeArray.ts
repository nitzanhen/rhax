
/**
 * Creates an array with the given length, filled with the elements
 * returned by the factory
 * 
 * @param len new array's length
 * @param factory array element factory
 * 
 * @example 
 * makeArray(4, i => i ** 2) => [1, 4, 9 ,16] 
 */
export const makeArray = <T>(len: number, factory: (index: number) => T): T[] =>
  [...new Array(len).keys()].map(factory);