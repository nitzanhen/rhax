

/**
 * Converts a list of items to a list of numbers by a given transformation (`toNumber`), and sums those numbers.
 * 
 * `toNumber` assigns, to each item in a list `items`, a number; these numbers are then summed up, and the result is returned.
 * 
 * @param items the list of items to aggregate.
 * @param toNumber the function by which to turn items into numbers. 
 * 
 * @example
 * const cities = [{ population: 69_000 }, { population: 995_400 }, { population: 597_600 }];
 * const totalPopulation = sumItems(cities, city => city.population);
 * console.log(totalPopulation); // 1_662_000
 */
export function sumItems<T>(items: T[], toNumber: (it: T) => number): number;

/**
 * Curried variant of `sumItems`.
 * 
 * @example
 * type City = { population: number };
 * const countPopulation = sumItems((city: City) => city.population);
 * console.log(typeof countPopulation); // 'function'
 * 
 * const cities = [{ population: 69_000 }, { population: 995_400 }, { population: 597_600 }];
 * const totalPopulation = countPopulation(cities);
 * console.log(totalPopulation); // 1_662_000
 */
export function sumItems<T>(toNumber: (it: T) => number): (items: T[]) => number;
export function sumItems(...args: any[]) {
  if (args.length === 1 && typeof args[0] === 'function') {
    const [toNumber] = args;
    return (items: any[]) => sumItems(items, toNumber);
  }

  const [items, toNumber] = args;
  return sum(items.map(toNumber));
}

/**
 * Sums the elements of a given list of numbers.
 * 
 * @param numbers the numbers to sum up. Can be either a variable number of number arguments,
 * or an array of numbers. If no arguments or an empty array are passed, `sum` returns `0`.
 * 
 * @example
 * const s1 = sum(1, 43, 2.3, 5, -2);
 * console.log(s1); // 49.3
 * 
 * const s2 = sum([1, 43, 2.3, 5, -2]);
 * console.log(s2); // 49.3
 */
export function sum(...numbers: number[]): number;
export function sum(numbers: number[]): number;
export function sum(...args: any[]): number {
  if (args.length > 1 || !Array.isArray(args[0])) {
    return sum(args);
  }
  const [numbers] = args;

  return numbers.reduce((s, x) => s + x, 0);
}
