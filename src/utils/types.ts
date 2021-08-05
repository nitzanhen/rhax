export type ValueOf<T> = T[keyof T];
export type ElementOf<A> = A extends (infer E)[] ? E : never 
export type ItemOf<T extends RecordOrArray> = T extends any[] ? ElementOf<T> : ValueOf<T>
export type IdentifierOf<T extends RecordOrArray> = T extends any[] ? number : keyof T;

export type EmptyObj = Record<string, never>;

export type Constructor<T> = new (...args: any[]) => T;

export type Func<A extends any[], B> = (...args: A) => B;

export type NoTail<A extends any[]> = A extends [...(infer H), any] ? H : never;
export type Rest<H extends any[], A extends [...H, ...any[]]> = A extends [...H, ...(infer T)] ? T : never;
export type Tail<A extends any[]> = A extends [...(infer H), any] ? Rest<H, A> : never;

export type ObjectKey = string | number | symbol;

/** 
 * Used as a constraint for generic types in function overloads, 
 * especially those that accept either an array or a record.
*/
export type RecordOrArray = any[] | Record<string, unknown>;
