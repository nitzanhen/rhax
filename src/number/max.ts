import { tuple } from '../core/helpers';

/**
 * Finds, for a given list of items, the item for which the *maximal* value is achieved, as evaluated by a given `toNumber` transformer.
 * 
 * `toNumber` assigns, to each item in a list `items`, a number; this number can be used to compare between two items in the list.
 * `maxItem` returns the item in the list for which is assined number is the greatest. If multiple items share the maximal value, the first is returned.
 * 
 * @param items the items to aggregate.
 * @param toNumber a function that transforms each item to a number.
 * 
 * @example
 * const longestString = maxItem(['a', '32f', '#ffd'], s => s.length);
 * console.log(longestString); // '#ffd'
 */
export function maxItem<T>(items: T[], toNumber: (it: T) => number): T;

/**
 * Curried version of `maxItem`.
 * 
 * @example
 * const longestInList = maxItem((s: string) => s.length);
 * console.log(typeof longestInList) // 'function'
 * 
 * const longestString = longestInList(['a', '32f', '#ffd']);
 * console.log(longestString); // '#ffd'
 */
export function maxItem<T>(toNumber: (it: T) => number): (items: T[]) => T;
export function maxItem(...args: any[]) {
  if (args.length === 1 && typeof args[0] === 'function') {
    const [toNumber] = args;
    return (items: any[]) => maxItem(items, toNumber);
  }

  const [items, toNumber] = args;
  return (items as any[])
    .map(it => tuple(it, toNumber(it)))
    .reduce(
      (maxPair, pair) => (maxPair[1] >= pair[1]) ? maxPair : pair,
      [undefined, -Infinity]
    )[0];
}

/**
 * Returns the largest number in a given list.
 * 
 * @param numbers the numbers to get the maximum of. Can be either a variable number of number arguments,
 * or an array of numbers. If no arguments or an empty array are passed, `max` returns `-Infinity`.
 * 
 * @example
 * const m1 = max(1, 43, 2.3, 5, -2);
 * console.log(m1); // 43
 * 
 * const m2 = max([1, 43, 2.3, 5, -2]);
 * console.log(m2); // 43
 */
export function max(...numbers: number[]): number;
export function max(numbers: number[]): number;
export function max(...args: any[]): number {
  if (args.length > 1 || !Array.isArray(args[0])) {
    return max(args);
  }

  const [numbers] = args;
  return numbers.reduce(
    (m, x) => Math.max(m, x),
    -Infinity
  );
}
