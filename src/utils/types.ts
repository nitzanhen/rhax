export type ValueOf<T> = T[keyof T];

export type EmptyObj = Record<string, never>;

export type Constructor<T> = new (...args: any[]) => T;

export type Func<A extends any[], B> = (...args: A) => B;

export type NoTail<A extends any[]> = A extends [...(infer H), any] ? H : never;
export type Rest<H extends any[], A extends [...H, ...any[]]> = A extends [...H, ...(infer T)] ? T : never;
export type Tail<A extends any[]> = A extends [...(infer H), any] ? Rest<H, A> : never;