import { toObject } from '../array';

export const pick = <O extends object, K extends keyof O>(obj: O, ...keys: K[]): Pick<O, K> =>
  toObject(keys.map(k => [k, obj[k]] as [K, O[K]])) as Pick<O, K>;