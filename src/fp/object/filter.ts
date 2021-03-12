
export const filter = <K extends string, V>(predicate: (value: V, key: K, record: Record<K, V>) => boolean, record: Record<K, V>): Record<K, V> => (Object.entries(record) as [K, V][])
  //Filter entries by the predicate
  .filter(([k, v]) => predicate(v, k, record))
  //Reduce the entries array back to an object
  .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {} as Record<K, V>);