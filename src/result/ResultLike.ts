
export type OkLike<T> = { ok: true } & T;

export function okLike<T>(data: T): OkLike<T> {
  return { ...data, ok: true };
}

export type ErrLike<E> = { ok: false } & E;

export function errLike<E>(error: E): ErrLike<E> {
  return { ...error, ok: false };
}

export type ResultLike<T, E> = OkLike<T> | ErrLike<E>;

