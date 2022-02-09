export type ValueOf<T> = T[keyof T];
export type EntryOf<T> = [keyof T, ValueOf<T>]

export type Fn<A, B> = (arg: A) => B;

export type ObjectKey = string | number | symbol;
