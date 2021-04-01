import { ValueOf } from '../../types';

export type Mapped<O, W> = {
  [K in keyof O]: W
}

export const mapFields = <O, W>(fn: (value: ValueOf<O>, key: keyof O, record: O) => W, record: O): Mapped<O, W> =>
  (Object.entries(record) as [keyof O, ValueOf<O>][])
    //Map each value of the current value to the value returned from `fn`; V -> W
    .map(([k, v]) => [k, fn(v, k, record)] as [keyof O, W])
    //Reduce the entries array back to an object
    .reduce((acc, [k, w]) => ({ ...acc, [k]: w }), {} as Mapped<O, W>);

