import { ErrLike, OkLike } from './ResultLike';

export type Ok<T> = OkLike<{ data: T }>;

export function ok<T>(data: T): Ok<T> {
  return { ok: true, data };
}

export type Err<E> = ErrLike<{ error: E }>;

export function err<E>(error: E): Err<E> {
  return { ok: false, error };
}

export type Result<T, E = unknown> = Ok<T> | Err<E>;
