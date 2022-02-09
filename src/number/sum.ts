
export const sumItems = <T>(items: T[], toNumber: (it: T) => number): number =>
  items.map(toNumber).reduce((s, x) => s + x, 0);

export const sum = (...numbers: number[]): number => 
  numbers.reduce((s, x) => s + x, 0);