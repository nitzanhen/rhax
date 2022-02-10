import { toObject, tuple } from '../array';
import { ValueOf } from '../utils/types';
import { entries } from './helpers';

export type Mapped<O, W> = {
  [K in keyof O]: W
}

export type ObjectMapper<O extends object, W> = (value: ValueOf<O>, key: keyof O) => W;

export const mapObject = <O extends object, W>(obj: O, mapper: ObjectMapper<O, W>): Mapped<O, W> =>
  toObject(entries(obj).map(([k, v]) => tuple(k, mapper(v, k))));