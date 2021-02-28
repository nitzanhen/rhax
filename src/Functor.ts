import { CoreFunctor } from './CoreFunctor';
import { NumberFunctor } from './NumberFunctor';
import { ObjectFunctor } from './ObjectFunctor';


export type Functor<T> =
  & CoreFunctor<T>
  & T extends number ? NumberFunctor : {}
  & {} extends T
  ? ObjectFunctor<never, never>
  /** For some reason, an empty object makes this conditional clause "crash" and automatically return never.
   *  The check above for {} guards this - returning {} immediately. */
  : T extends Record<infer K, infer V>
  /**/ ? K extends string
  /****/ ? ObjectFunctor<K, V>
  /****/ : {}
  /**/ : {};