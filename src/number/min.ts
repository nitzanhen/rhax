import { tuple } from '../core/helpers';

/**
 * Finds, for a given list of items, the item for which the *minimal* value is achieved, as evaluated by a given `toNumber` transformer.
 * 
 * `toNumber` assigns, to each item in a list `items`, a number; this number can be used to compare between two items in the list.
 * `minItem` returns the item in the list for which is assined number is the greatest. If multiple items share the minimal value, the first is returned.
 * 
 * @param items the items to aggregate.
 * @param toNumber a function that transforms each item to a number.
 * 
 * @example
 * const longestString = minItem(['a', '32f', '#ffd'], s => s.length);
 * console.log(longestString); // 'a'
 */
export function minItem<T>(items: T[], toNumber: (it: T) => number): T;

/**
 * Curried version of `minItem`.
 * 
 * @example
 * const longestInList = minItem((s: string) => s.length);
 * console.log(typeof longestInList) // 'function'
 * 
 * const longestString = longestInList(['a', '32f', '#ffd']);
 * console.log(longestString); // 'a'
 */
export function minItem<T>(toNumber: (it: T) => number): (items: T[]) => T;
export function minItem(...args: any[]) {
  if (args.length === 1 && typeof args[0] === 'function') {
    const [toNumber] = args;
    return (items: any[]) => minItem(items, toNumber);
  }

  const [items, toNumber] = args;
  return (items as any[])
    .map(it => tuple(it, toNumber(it)))
    .reduce(
      (minPair, pair) => (minPair[1] <= pair[1]) ? minPair : pair,
      [undefined, Infinity]
    )[0];
}


/**
 * Returns the smallest number in a given list.
 * 
 * @param numbers the numbers to get the minimum of. Can be either a variable number of number arguments,
 * or an array of numbers. If no arguments or an empty array are passed, `min` returns `Infinity`.
 * 
 * @example
 * const m1 = min(1, 43, 2.3, 5, -2);
 * console.log(m1); // -2
 * 
 * const m2 = min([1, 43, 2.3, 5, -2]);
 * console.log(m2); // -2
 */
export function min(...numbers: number[]): number;
export function min(numbers: number[]): number;
export function min(...args: any[]): number {
  if (args.length > 1 || !Array.isArray(args[0])) {
    return min(args);
  }

  const [numbers] = args;
  return numbers.reduce(
    (m, x) => Math.min(m, x),
    Infinity
  );
}
