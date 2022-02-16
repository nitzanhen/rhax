import { ObjectKey } from '../utils/types';


export const toObject = <K extends ObjectKey, V>(entries: [K, V][]): Record<K, V> =>
  entries.reduce(
    (acc, [k, v]) => ({ ...acc, [k]: v }),
    {} as Record<K, V>
  );