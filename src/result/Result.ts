import { ErrLike, OkLike } from './ResultLike';

export type Ok<T> = OkLike<{ data: T }>;

export function ok(): Ok<void>;
export function ok<T>(data: T): Ok<T>;
export function ok<T>(data?: T): Ok<T> {
  return { ok: true, data: data as T };
}

export type Err<E> = ErrLike<{ error: E }>;

export function err<E>(error: E): Err<E> {
  return { ok: false, error };
}

export type Result<T, E = unknown> = Ok<T> | Err<E>;
