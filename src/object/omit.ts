import { filterObject } from './filter';

export const omit = <O extends object, K extends keyof O>(obj: O, keys: K[]): Omit<O, K> => {
  const keySet = new Set<keyof O>(keys);

  return filterObject(obj, (_, k) => keySet.has(k));
};