import { curryLast } from './curryLast';
import { Func, NoTail, Tail } from './types';

export interface DualFunc<A extends any[], B> {
    (...args: A): B;
    (...args: NoTail<A>): (...tail: Tail<A>) => B
}

export function dualFunc<A extends any[], B>(
    fn: Func<A, B>
) {
    const curried = curryLast(fn);

    // Define the returned function as an anonymous function in an object
    // to preserve its name, then return that function.
    const returns = {
        [fn.name]: function (...args: [...NoTail<A>, Tail<A>?]) {
            const tailFn = curried(...(args as any));
            return arguments.length >= fn.length
                // eslint-disable-next-line prefer-rest-params
                ? (tailFn as any)(arguments[fn.length])
                : tailFn;
        } as unknown as DualFunc<A, B>
    };

    return Object.values(returns)[0];
}