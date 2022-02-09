
/**
 * Ensures that `x` is in the range between the given minimum and maximum values.
 * If it isn't, returns the closest bound (`min` if `x < min`, `max` if `max < x`) 
 * 
 * @example
 * clamp(1, 0, 2)  // ==> 1
 * clamp(-1, 0, 2) // ==> 0
 * clamp(3, 0, 2)  // ==> 2
 */
export const clamp = (x: number, min: number, max: number) => {
  if (x < min) return min;
  else if (x > max) return max;
  else return x;
};