
export function sumItems<T>(toNumber: (it: T) => number): (items: T[]) => number;
export function sumItems<T>(items: T[], toNumber: (it: T) => number): number;
export function sumItems(...args: any[]) {
  if (args.length === 1 && typeof args[0] === 'function') {
    const [toNumber] = args;
    return (items: any[]) => sumItems(items, toNumber);
  }

  const [items, toNumber] = args;
  return sum(items.map(toNumber));
}

export function sum(...number: number[]): number;
export function sum(numbers: number[]): number;
export function sum(...args: any[]): number {
  if (args.length > 1 || !Array.isArray(args[0])) {
    return sum(args);
  }
  const [numbers] = args;

  return numbers.reduce((s, x) => s + x, 0);
}
