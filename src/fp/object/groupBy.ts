import { ValueOf } from '../../utils/types';

import { reduce } from './reduce';

export const groupBy = <O, T extends string | number | symbol>(tagger: (value: ValueOf<O>, key: keyof O, record: O) => T, record: O) =>
  reduce(
    (groups, v, k, record) => {
      const tag = tagger(v, k, record);
      return { ...groups, [tag]: groups[tag] ? [...groups[tag]!, v] : [v] };
    },
    {} as Record<T, ValueOf<O>[]>, record
  );