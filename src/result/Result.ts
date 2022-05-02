

export interface Ok<T> {
  ok: true,
  data: T
}

export const ok = <T>(data: T): Ok<T> => ({ ok: true, data });

export interface Err<E> {
  ok: false,
  error: E
}

export const err = <E>(error: E): Err<E> => ({ ok: false, error });

export type Result<T, E = unknown> = Ok<T> | Err<E>;
