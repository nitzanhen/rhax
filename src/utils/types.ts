export type ValueOf<T> = T[keyof T];

export type EmptyObj = Record<string, never>;

export type Constructor<T> = new (...args: any[]) => T