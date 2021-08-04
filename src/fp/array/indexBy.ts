import { ObjectKey } from '../../utils/types';
import { reduce } from '../object/reduce';

export const indexBy = <E, T extends ObjectKey>(indexer: (element: E, index: number) => T, array: E[]) =>
  reduce(
    (record, element, index) => {
      const key = indexer(element, index);
      return { ...record, [key]: element };
    },
    {} as Record<T, E>,
    array
  );