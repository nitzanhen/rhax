
/**
 * Ensures that `x` is in the range between the given minimum and maximum values.
 * If it isn't, returns the closest bound (`min` if `x < min`, `max` if `max < x`) 
 * 
 * @example
 * clamp(1, [0, 2])  // ==> 1
 * clamp(-1, [0, 2]) // ==> 0
 * clamp(3, [0, 2])  // ==> 2
 */
export function clamp(x: number, [min, max]: [number, number]): number;
export function clamp([min, max]: [number, number]): (x: number) => number;
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