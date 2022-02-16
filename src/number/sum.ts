
export const sumItems = <T>(items: T[], toNumber: (it: T) => number): number =>
  items.map(toNumber).reduce((s, x) => s + x, 0);

export interface SumFunction {
  (...numbers: number[]): number;
  (numbers: number[]): number;
}

export const sum: SumFunction = ((...args: any[]): number => {
  if (args.length > 1 || !Array.isArray(args[0])) {
    return sum(args);
  }
  const [numbers] = args;

  return numbers.reduce((s, x) => s + x, 0);
});
