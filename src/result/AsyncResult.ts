import { err, ok, Result } from './Result';

export type AsyncResult<T, E = unknown> = Promise<Result<T, E>>;

export const resultify = <T, E = unknown>(promise: Promise<T>): AsyncResult<T, E> => new Promise((resolve, reject) => {
  promise.then(
    v => resolve(ok(v)),
    e => reject(err(e))
  );
});