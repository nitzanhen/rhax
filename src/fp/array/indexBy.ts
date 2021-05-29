import { reduce } from './reduce';

export const indexBy = <E, T extends string | number | symbol>(indexer: (element: E, index: number, array: E[]) => T, array: E[]) =>
  reduce(
    (record, element, index) => {
      const key = indexer(element, index, array);
      return { ...record, [key]: element };
    },
    {} as Record<T, E>,
    array
  );