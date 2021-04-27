export type ValueOf<T> = T[keyof T];

export type EmptyObj = Record<string, never>;