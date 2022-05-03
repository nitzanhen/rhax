

export type Ok<T> = { ok: true } & T;

export function ok<T>(data: T): Ok<{ data: T }>;
export function ok<K extends string, T>(key: K, value: T): Ok<{ [key in K]: T }>;
export function ok(...args: [data: any] | [key: string, value: any]) {
  if(args.length === 1) {
    const [data] = args;
    return { ok: true, data };
  }

  const [key, data] = args;
  return { ok: true, [key]: data };
}

export type Err<E> = { ok: false } & E;

export function err<E>(error: E): Err<{ error: E }>;
export function err<K extends string, E>(key: K, value: E): Err<{ [key in K]: E }>;
export function err(...args: [error: any] | [key: string, error: any]) {
  if(args.length === 1) {
    const [error] = args;
    return { ok: false, error };
  }

  const [key, error] = args;
  return { ok: false, [key]: error };
}


export type Result<T, E = unknown> = Ok<T> | Err<E>;
