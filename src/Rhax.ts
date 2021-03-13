import { RhaxCore } from './RhaxCore';
import { NumberRhax } from './NumberRhax';
import { ObjectRhax } from './ObjectRhax';

/**
 * Simplifies the Rhax type defined below by instructing Typescript
 * to infer K as a type that extends string.
 * Originally I included the test inline:
 * ```typescript
 *  T extends Record<infer K, infer V>
 *  ? K extends string
 *    ? ObjectRhax<K, V>
 *    : Record<string, never>
 *  : Record<string, never>;
 * ```
 * but that cause a bug where union types (e.g. 'a' | 'b' | 'c') were
 * distributed to a union of multiple `ObjectRhax`s instead an `ObjectRhax` of the union.
 */
type StringRecord<K extends string, V> = Record<K, V>;

export type Rhax<T> =
  & RhaxCore<T>
  & T extends number ? NumberRhax : Record<string, never>
  & Record<string, never> extends T ? ObjectRhax<never, never>
  /** For some reason, an empty object makes this conditional clause "crash" and automatically return never.
   *  The check above for {} guards this - returning {} immediately. */
  : T extends StringRecord<infer K, infer V> ? ObjectRhax<K, V> : Record<string, never>;