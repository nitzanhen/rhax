export const reduce = <K extends string, V, A = Record<K, V>>(reducer: (acc: A, value: V, key: K, record: Record<K, V>) => A, initialValue: A, record: Record<K, V>) =>
  (Object.entries(record) as [K, V][])
    //Reduce using the reducer argument
    .reduce((acc, [k, v]) => reducer(acc, v, k, record), initialValue);