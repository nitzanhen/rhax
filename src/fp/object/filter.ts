import { RecordOrArray, ValueOf } from '../../utils/types';

type RecordPredicate<O> = (value: ValueOf<O>, key: keyof O) => boolean;
type ArrayPredicate<E> = (element: E, index: number) => boolean;

export function filter<C extends RecordOrArray>(
  predicate: C extends (infer E)[] ? ArrayPredicate<E> : RecordPredicate<C>
): C extends (infer E)[] ? (array: E[]) => E[] : (record: C) => Partial<C>

export function filter<O>(
  predicate: RecordPredicate<O>,
  record: O
): Partial<O>;

export function filter<E>(
  predicate: ArrayPredicate<E>,
  arr: E[]
): E[];

export function filter<O, E>(
  predicate: RecordPredicate<O> | ArrayPredicate<E>,
  recordOrArray?: O | E[]
) {
  if (arguments.length < 2) {
    return (collection: O | E[]) => filter(predicate as any, collection);
  }

  if (Array.isArray(recordOrArray)) {
    return recordOrArray.filter(predicate as ArrayPredicate<E>);
  }

  const entries = Object.entries(recordOrArray!) as [keyof O, ValueOf<O>][];
  return entries
    //Filter entries by the predicate
    .filter(([k, v]) => (predicate as RecordPredicate<O>)(v, k))
    //Reduce the entries array back to an object
    .reduce((acc, [k, v]) => ({ ...acc, [k]: v }), {} as Partial<O>);
}
