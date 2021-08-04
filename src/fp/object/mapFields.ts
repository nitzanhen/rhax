import { ElementOf, RecordOrArray, ValueOf } from '../../utils/types';

export type Mapped<O, W> = {
  [K in keyof O]: W
}

export type ArrayMapper<E, W> = (element: E[], index: number) => W;
export type RecordMapper<O, W> = (value: ValueOf<O>, key: keyof O) => W
export type Mapper<C extends RecordOrArray, W> = C extends (infer E)[] ? ArrayMapper<E, W> : RecordMapper<C, W>;

export function map<O extends Record<string, unknown>, W>(mapper: RecordMapper<O, W>, record: O): Mapped<O, W>;
export function map<E, W>(mapper: ArrayMapper<E, W>, array: E[]): W[];

export function map<C extends RecordOrArray, W>(
  mapper: Mapper<C, W>
): C extends (infer E)[] ? ((array: E[]) => W[]) : ((record: C) => Mapped<C, W>)

export function map<C extends RecordOrArray, W>(mapper: Mapper<C, W>, collection?: C) {
  if (arguments.length < 2) {
    return <C extends RecordOrArray>(collection: C) => map(mapper as any, collection as any);
  }

  if (Array.isArray(collection)) {
    return collection.map((element, index) => (mapper as ArrayMapper<ElementOf<C>, W>)(element, index), collection);
  }

  return (Object.entries(collection!) as [keyof C, ValueOf<C>][])
    //Map each value of the current value to the value returned from `fn`; V -> W
    .map(([k, v]) => [k, (mapper as RecordMapper<C, W>)(v, k)] as [keyof C, W])
    //Reduce the entries array back to an object
    .reduce((acc, [k, w]) => ({ ...acc, [k]: w }), {} as Mapped<C, W>);
}


