
/**
 * Creates an array with a given length, with elements from a factory function.
 * 
 * @param len new array's length.
 * @param factory array element factory.
 * if `factory` is not set, the created array will be filled with the indices.
 * 
 * @example 
 * const arr = makeArray(4, i => i ** 2);
 * console.log(arr); // [1, 4, 9 ,16] 
 */
export function makeArray(len: number): number[];
export function makeArray<T>(len: number, factory: (index: number) => T): T[];
export function makeArray(len: number, factory: (index: number) => any = (i => i)) {
  return [...new Array(len).keys()].map(factory);
}
  