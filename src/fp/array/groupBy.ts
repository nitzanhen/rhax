import { reduce } from './reduce';

export const groupBy = <E, T extends string | number | symbol>(tagger: (element: E, index: number, array: E[]) => T, array: E[]) =>
  reduce(
    (groups, e, i) => {
      const tag = tagger(e, i, array);
      return { ...groups, [tag]: groups[tag] ? [...groups[tag]!, e] : [e] };
    },
    {} as Record<T, E[]>,
    array
  );