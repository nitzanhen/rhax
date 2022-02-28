import { tuple } from '../core/helpers';

/**
 * Returns the item of `items` for which the *maximal* value by `toNumber` is received.
 * If multiple items share the maximal value, the first is returned.
 * 
 * @param items the items to aggregate
 * @param toNumber a function that transforms each item to a number
 * 
 * @example
 * maxItem(['a', '32f', '#ffd'], s => s.length) => '#ffd'
 */
export function maxItem<T>(items: T[], toNumber: (it: T) => number): T;
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
* Returns the largest value out of the given `numbers`.
* 
* @example
* max([1, 43, 2.3, 5, -2]) => 43
* max(1, 43, 2.3, 5, -2) => 43
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
