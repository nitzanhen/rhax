
export const reduce = <E, A>(
  reducer: (acc: A, element: E, index: number, array: E[]) => A, initialValue: A, array: E[]
) => array.length === 0
    ? initialValue
    : array.reduce(reducer, initialValue);