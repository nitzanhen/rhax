import { err, ok, Result } from './Result';
import { ResultLike } from './ResultLike';

export type AsyncResult<T, E = unknown> = Promise<Result<T, E>>;

export type AsyncResultLike<T, E> = Promise<ResultLike<T, E>>;

export const resultify = <T, E = unknown>(promise: Promise<T>): AsyncResult<T, E> => new Promise((resolve, reject) => {
  promise.then(
    v => resolve(ok(v)),
    e => reject(err(e))
  );
});