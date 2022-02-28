
import { ObjectKey } from '../utils/types';
import { filter } from './filter';

export function omit<O extends object, K extends keyof O>(obj: O, ...keys: K[]): Omit<O, K>;
export function omit<K extends ObjectKey>(...keys: K[]): <O extends Record<K, any>>(obj: O) => Omit<O, K>;
export function omit(...args: any[]) {
  if (typeof args[0] !== 'object') {
    const keys = args;
    return (obj: any) => omit(obj, ...keys);
  }

  const [obj, ...keys] = args;
  const keySet = new Set(keys);

  return filter.object(obj, (_, k) => keySet.has(k));
}