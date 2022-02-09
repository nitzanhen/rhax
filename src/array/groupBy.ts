import { ObjectKey } from '../utils/types';

export type ArrayTagger<E, T extends ObjectKey> = (element: E, index: number) => T;

export const groupBy = <E, T extends ObjectKey>(
  arr: E[],
  tagger: ArrayTagger<E, T>,
  initialGroups = {} as Record<T, E[]>
): Record<T, E[]> =>
  arr.reduce(
    (groups, e, i) => {
      const tag = tagger(e, i);
      return { ...groups, [tag]: groups[tag] ? [...groups[tag], e] : [e] };
    },
    initialGroups as Record<T, E[]>
  );