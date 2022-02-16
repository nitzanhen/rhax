import { Fn } from './utils/types';

export interface Pipe<T> {
  <S>(fn: Fn<T, S>): Pipe<S>;
  go(): T
}

export interface PipeFactory {
  (): Pipe<void>;
  <T>(x: T): Pipe<T>;
}

export const pipe = (<T>(x: T): Pipe<T> => {
  const cb = <S>(fn: Fn<T, S>) => pipe(fn(x)) as unknown as Pipe<S>;
  cb.go = () => x;
  return cb;
}) as PipeFactory;