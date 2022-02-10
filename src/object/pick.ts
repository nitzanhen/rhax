import { toObject, tuple } from '../array';

export const pick = <O extends object, K extends keyof O>(obj: O, ...keys: K[]): Pick<O, K> =>
  toObject(keys.map(k => tuple(k, obj[k]))) as Pick<O, K>;