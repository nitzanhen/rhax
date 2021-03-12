
export const findKey = <K extends string, V>(query: (value: V, key: K, record: Record<K, V>) => boolean, record: Record<K, V>) =>
  (Object.entries(record) as [K, V][])
    .find(([k, v]) => query(v, k, record))?.[0];