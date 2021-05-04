export const groupBy = <E, T extends string | number | symbol>(tagger: (element: E, index: number, array: E[]) => T, array: E[]) =>
  array.reduce(
    (groups, e, i) => {
      const tag = tagger(e, i, array);
      return { ...groups, [tag]: groups[tag] ? [...groups[tag]!, e] : [e] };
    },
    {} as Partial<Record<T, E[]>>
  );