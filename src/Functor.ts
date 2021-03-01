import { CoreFunctor } from './CoreFunctor';
import { NumberFunctor } from './NumberFunctor';
import { ObjectFunctor } from './ObjectFunctor';

/**
 * Simplifies the Functor type defined below by instructing Typescript
 * to infer K as a type that extends string.
 * Originally I included the test inline:
 * ```typescript
 *  T extends Record<infer K, infer V>
 *  ? K extends string
 *    ? ObjectFunctor<K, V>
 *    : Record<string, never>
 *  : Record<string, never>;
 * ```
 * but that cause a bug where union types (e.g. 'a' | 'b' | 'c') were
 * distributed to a union of three `ObjectFunctor`s instead an `ObjectFunctor` of the union.
 */
type StringRecord<K extends string, V> = Record<K, V>;

export type Functor<T> =
  & CoreFunctor<T>
  & T extends number ? NumberFunctor : Record<string, never>
  & Record<string, never> extends T
  ? ObjectFunctor<never, never>
  /** For some reason, an empty object makes this conditional clause "crash" and automatically return never.
   *  The check above for {} guards this - returning {} immediately. */
  : T extends StringRecord<infer K, infer V> ? ObjectFunctor<K, V> : Record<string, never>;