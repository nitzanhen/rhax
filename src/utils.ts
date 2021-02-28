/**
 * Ensures that `x` is in the range between the given minimum and maximum values.
 * If it isn't, returns the closest bound (`min` if `x < min`, `max` if `max < x`) 
 * @param min the lower bound of the range.
 * @param max the upper bound of the range.
 * @param x the number to clamp.
 */
export const clamp = (min: number, max: number, x: number) => {
  if (x < min) return min;
  else if (max < x) return max;
  else return x;
}