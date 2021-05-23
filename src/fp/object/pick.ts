import { reduce } from './reduce';

export const pick = <O, K extends keyof O>(keys: K[], record: O): Pick<O, K> => {
  const keySet = new Set<keyof O>(keys);

  return reduce((acc, v, k) =>
    keySet.has(k) ? ({ ...acc, [k]: v }) : acc,
    {} as Pick<O, K>,
    record
  );
};

