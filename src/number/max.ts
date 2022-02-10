import { tuple } from '../array/tuple';

/**
 * Returns the item of `items` for which the *maximal* value by `toNumber` is received.
 * If multiple items share the maximal value, the first is returned.
 * 
 * @param items the items to aggregate
 * @param toNumber a function that transforms each item to a number
 * 
 * @example
 * minItem(['a', '32f', '#ffd'], s => s.length) => '#ffd'
 */
 export const maxItem = <T>(items: T[], toNumber: (it: T) => number): T =>
 items.map(it => tuple(it, toNumber(it)))
   .reduce(
     (minPair, pair) => (minPair[1] > pair[1]) ? minPair : pair,
     [undefined as unknown as T, Infinity]
   )[0];

/**
* Returns the largest value out of the given `numbers`.
* 
* @example
* min(1, 43, 2.3, 5, -2) => 43
*/
export const max = (...numbers: number[]): number =>
 numbers.reduce(
   (m, x) => Math.max(m, x),
   Infinity
 );