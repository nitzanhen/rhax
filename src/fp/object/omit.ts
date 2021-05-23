import { reduce } from './reduce';

export const omit = <O, K extends keyof O>(keys: K[], record: O): Omit<O, K> =>
  reduce((acc, v, k) =>
    (keys as (keyof O)[]).includes(k) ? acc : ({ ...acc, [k]: v }),
    {} as Omit<O, K>,
    record
  );