
/**
 * Returns the item of `items` for which the *minimal* value by `toNumber` is received.
 * If multiple items share the minimal value, the first is returned.
 * 
 * @param items the items to aggregate
 * @param toNumber a function that transforms each item to a number
 * 
 * @example
 * minItem(['a', '32f', '#ffd'], s => s.length) => 'a'
 */
export const minItem = <T>(items: T[], toNumber: (it: T) => number): T =>
  items.map(it => [it, toNumber(it)] as [T, number])
    .reduce(
      (minPair, pair) => (minPair[1] < pair[1]) ? minPair : pair,
      [undefined as unknown as T, Infinity]
    )[0];

/**
 * Returns the smallest value out of the given `numbers`.
 * 
 * @example
 * min(1, 43, 2.3, 5, -2) => -2
 */
export const min = (...numbers: number[]): number =>
  numbers.reduce(
    (m, x) => Math.min(m, x),
    Infinity
  );