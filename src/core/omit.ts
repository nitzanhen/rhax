import { filter } from './filter';

export function omit<O extends object, K extends keyof O>(obj: O, ...keys: K[]): Omit<O, K>;
export function omit<O extends object, K extends keyof O>(...keys: K[]): (obj: O) => Omit<O, K>;
export function omit(...args: any[]) {
  if (typeof args[0] !== 'object') {
    const keys = args;
    return (obj: any) => omit(obj, ...keys);
  }

  const [obj, ...keys] = args;
  const keySet = new Set(keys);

  return filter.object(obj, (_, k) => keySet.has(k));
}