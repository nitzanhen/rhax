import { ObjectKey } from '../utils/types';

import { reduce } from './reduce';

export type ArrayIndexer<E, T> = (element: E, index: number) => T

export const indexBy = <E, T extends ObjectKey>(indexer: ArrayIndexer<E, T>, array: E[]) =>
  reduce(
    (record, element, index) => {
      const key = indexer(element, index);
      return { ...record, [key]: element };
    },
    {} as Record<T, E>,
    array
  );