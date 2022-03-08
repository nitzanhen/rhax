
/**
 * Ensures that a number is within a given interval.
 * 
 * If a number `x` is not contained in a given interval `[min, max]`, 
 * `clamp` returns the closest bound (`min` if `x` < `min`, `max` if `max` < `x`) 
 * 
 * @example
 * console.log(clamp(1, [0, 2])) // 1
 * console.log(clamp(-1, [0, 2])) // 0
 * console.log(clamp(3, [0, 2])) // 2
 */
export function clamp(x: number, interval: [min: number, max: number]): number;

/**
 * Curried variant of `clamp`.
 * 
 * @example
 * const clamped = clamp([0, 2]);
 * console.log(typeof clamped); // 'function'
 * 
 * console.log(clamped(1)) // 1
 * console.log(clamped(-1)) // 0
 * console.log(clamped(3)) // 2
 */
export function clamp(interval: [min: number, max: number]): (x: number) => number;
export function clamp(...args: any[]) {
  if (args.length === 1) {
    const [[min, max]] = args;
    return (x: number) => clamp(x, [min, max]);
  }

  const [x, [min, max]] = args;

  if (x < min) return min;
  else if (x > max) return max;
  else return x;
}