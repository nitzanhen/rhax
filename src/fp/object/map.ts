export const mapFields = <K extends string, V, W>(fn: (value: V, key: K, record: Record<K, V>) => W, record: Record<K, V>): Record<K, W> =>
  (Object.entries(record) as [K, V][])
    //Map each value of the current value to the value returned from `fn`; V -> W
    .map(([k, v]) => [k, fn(v, k, record)] as [K, W])
    //Reduce the entries array back to an object
    .reduce((acc, [k, w]) => ({ ...acc, [k]: w }), {} as Record<K, W>);

