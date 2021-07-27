import { Func, NoTail, Tail } from './types';

type CurryTail<A extends any[], B> = Func<NoTail<A>, Func<Tail<A>, B>>;

/**
 * Curries the last argument of a function. 
 * 
 * @param fn the function to curry
 * @returns the curried function, that is, a function that receives all the original parameters
 * except the last, and returns a function that accepts the last argument and returns `fn`'s value.W
 */
export function curryLast<A extends any[], B>(
    fn: Func<A, B>
): CurryTail<A, B> {
    return (...head: NoTail<A>) => (...tail: Tail<A>) => (fn as any)(...head, ...tail);
}
