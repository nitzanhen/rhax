import { Fn } from './utils/types';

export interface Pipe<T> {
  <S>(fn: Fn<T, S>): Pipe<S>;
  go(): T
}

export interface PipeFactory {
  (): Pipe<void>;
  <T>(x: T): Pipe<T>;
}

/**
 * Pipes a value through a chain of functions in succession.
 * 
 * To end the pipeline and get the final result, use `.go()`.
 * 
 * @example
 * const v1 = pipe(1)
 *   (x => x + 1)
 *   (x => x * 2)
 *   .go();
 * 
 * console.log(v1) // 4
 */
export const pipe = (<T>(x: T): Pipe<T> => {
  const cb = <S>(fn: Fn<T, S>) => pipe(fn(x)) as unknown as Pipe<S>;
  cb.go = () => x;
  return cb;
}) as PipeFactory;