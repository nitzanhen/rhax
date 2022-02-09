import { EntryOf, ValueOf } from '../utils/types';

export const entries = <O extends object>(obj: O): [keyof O, ValueOf<O>][] => Object.entries(obj) as EntryOf<O>[];

export const keys = <O extends object>(obj: O): (keyof O)[] => Object.keys(obj) as (keyof O)[];

export const values = <O extends object>(obj: O): ValueOf<O>[] => Object.values(obj) as ValueOf<O>[];

export const isEmpty = (obj: object) => keys(obj).length === 0;