
import { ValueOf } from '../utils/types';
import { entries, tuple } from '../core/helpers';
import { toObject } from './toObject';

export type ArrayMapper<E, W> = (el: E, index: number) => W;
export type ObjectMapper<O extends object, W> = (value: ValueOf<O>, key: keyof O) => W;

export function map<E, W>(arr: E[], mapper: ArrayMapper<E, W>): W[];
export function map<E, W>(mapper: ArrayMapper<E, W>): (arr: E[]) => W[];
export function map(...args: any[]) {
  if (args.length === 1 && typeof args[0] === 'function') {
    const mapper = args[0];
    return (arr: any) => map(arr, mapper);
  }

  const [arr, mapper] = args;
  return arr.map(mapper);
}

function mapObject<O extends object, W>(mapper: ObjectMapper<O, W>): (obj: O) => Record<keyof O, W>;
function mapObject<O extends object, W>(obj: O, mapper: ObjectMapper<O, W>): Record<keyof O, W>;
function mapObject(...args: any[]) {
  if (args.length === 1 && typeof args[0] === 'function') {
    const mapper = args[0];
    return (obj: any) => map(obj, mapper);
  }

  const [obj, mapper] = args;
  return toObject(
    entries(obj).map(([k, v]) => tuple(k, mapper(v, k)))
  );
}

map.object = mapObject;