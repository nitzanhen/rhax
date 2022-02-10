
export const sumItems = <T>(items: T[], toNumber: (it: T) => number): number =>
  items.map(toNumber).reduce((s, x) => s + x, 0);

export function sum(...numbers: number[]): number;
export function sum(numbers: number[]): number;
export function sum(...args: any[]): number {
  if (args.length > 1 || !Array.isArray(args[0])) {
    return sum(args);
  }
  const [numbers] = args;

  return numbers.reduce((s, x) => s + x, 0);
}
