import { reduce } from './reduce';

export const pick = <O, K extends keyof O>(keys: K[], record: O): Pick<O, K> =>
  reduce((acc, v, k) =>
    (keys as (keyof O)[]).includes(k) ? ({ ...acc, [k]: v }) : acc,
    {} as Pick<O, K>,
    record
  );
