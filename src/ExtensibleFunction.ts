
/**
 * A class adapting Function for extension; this
 * allows creating callable object elegantly.
 * 
 * Borrowed from the excellent answer at {@link https://stackoverflow.com/a/36871498}
 */
export abstract class ExtensibleFunction<A extends any[], B> extends Function {
  //@ts-expect-error 2377
  constructor(fn: (...args: A) => B) {
    /**
     * Typescript enforces calling super in a subclass, but apparently this isn't mandatory
     * in Javascript (that's the reason for the ts-expect-error comment above).
     * Instead, we apply a prototype to the given `fn`, which is determined by the class that
     * was called with `new` (who knew that `new` had properties! that's cool!). 
     * 
     * ? `setPrototypeOf` might slow down performence (there's a fair warning on this at the MDN docs).
     * ? If it does, we *could* convert this to a hardcoded code function (the the first suggestion in the answer above),
     * ? but that seems non-elegant.
     */
    return Object.setPrototypeOf(fn, new.target.prototype);
  }
}