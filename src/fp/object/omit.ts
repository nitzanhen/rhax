import { reduce } from './reduce';

export const omit = <O, K extends keyof O>(keys: K[], record: O): Omit<O, K> => {
  const keySet = new Set<keyof O>(keys);

  return reduce((acc, v, k) =>
    keySet.has(k) ? acc : ({ ...acc, [k]: v }),
    {} as Omit<O, K>,
    record
  );
};
