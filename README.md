# Rhax
[![language](https://img.shields.io/github/languages/top/rhaxjs/rhax?color=blue&logo=typescript)](https://github.com/rhaxjs/rhax/search?l=typescript)
[![codecov](https://codecov.io/gh/rhaxjs/rhax/branch/main/graph/badge.svg?token=2nQUFAqZ24)](https://codecov.io/gh/rhaxjs/rhax)
[![npm](https://img.shields.io/npm/v/rhax?logo=npm&color=CB3837)](https://www.npmjs.com/package/rhax)
[![bundle size](https://img.shields.io/bundlephobia/minzip/rhax?color=green)](https://bundlephobia.com/result?p=rhax)
[![license](https://img.shields.io/github/license/rhaxjs/rhax?color=yellow)](https://choosealicense.com/licenses/mit/)

> v2 is WIP.

Rhax (ῥάξ - Ancient Greek for "grape") is a Typescript-first library for simple and elegant data transformations.<br/>
It was created with the "casual" Typescript functional programmer in mind, and aims to provide the advantages of functional programming, without requiring the programmer to surrender the entire codebase to the paradigm's constraints, restrictive methods, and ocean of jargon.

However, even if you don't use Typescript, or don't know what Functional Programming is, Rhax can still be of use for you!

It is lightweight, easy to pick up, and simple to introduce to new as well as existing projects.

---

## Installation
```bash
npm install rhax
# or
yarn add rhax
```
---
## The idea
[Functional programming](https://hackr.io/blog/functional-programming) (FP) is a progamming paradigm founded on the ideas of immutability, function purity, and others. It has become increasingly popular over the past few years, and its benefits shine in a variety of applications. Most popular modern languages (JS/TS included) have FP capabilities, and you, like most developers of those languages, are probably already using FP to some degree, perhaps without realizing it. If you're interested in diving into FP, I recommend [Professor Frisby's Mostly Adequate Guide to Functional Programming](https://mostly-adequate.gitbook.io/mostly-adequate-guide/), but there are [many other good resources](https://github.com/xgrommx/awesome-functional-programming).

However, the world of FP has many deep concepts - some rooted in abstract mathematics, some shrouded in FP terminology - and "true" functional programming requires a good understanding of most of those, as well as a commitment to the paradigm that's difficult to "break out" of when needed. This combination of a steep learning curve and a binding commitment is off-putting for many developers (myself included). Rhax was created with this slice of developers in mind - it aspires to provide a simple way for Javascript developers, new and seasoned, to enjoy the benefits of FP, without having to climb or move mountains.

Another point is that FP - and its concepts of declarability and function purity in particular - deal extremely well with type systems. It can make a big difference in developer experience and in quality (elegance, brevity _and_ maintainability). This is mostly true for Typescript developers, but can also assist plain Javascript developers through the intellisense features of modern IDEs.

### A simple example

Let's look at a simple example:
You have a function with one parameter, receiving an object with string values. You want to try parsing all values into numbers, supplying defaults for invalid ones.

An simple attempt at this might be:
```ts
  const parse = (strings: Record<string, string>) => {
    const parsed = {} as Record<string, number>;
    for(let [key, str] of Object.entries(strings)) {
      parsed[key] = parseInt(str) || 0;
    }

    return parsed;
  }
```
Or:
```ts
  const parse = (strings: Record<string, string>) => 
    Object.entries(strings)
      //Map strings to numbers
      .map(([key, str]) => [key, parseInt(str) || 0] as [string, number])
      //Reduce back from key-value pairs to object
      .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {} as Record<string, number>)
```

With Rhax, the operation becomes much simpler:
```ts
  const parse = (strings: Record<string, string>) => 
    take(strings).mapFields(str => parseInt(str) || 0)()
```

Practically a one-liner!
Length aside, the latter example contains less boilerplate, is more robust, and is declarative, i.e. it _highlights your intention_ rather than surrounding it in a paragraph of gray code. Additionally, types can be automatically inferred, saving you the trouble of dealing and maintaining manual type assertions.

And remember, that's only a simple example; the more complex your transformations, the more Rhax can help you.

## API

The process of transforming data with Rhax is straightforward: you `take` a value, call the defined methods on it, then get the result back:

```ts
import { take } from 'rhax';

take("value") // 1. take a value
  .map(...) // 2. apply transformations
  .default(...)
  //etc
  () // 3. get the result
```

### Type-dynamic methods

An important aspect of the library is that it assigns methods **dynamically**.
Objects, for example, have an entire set of methods (transformations) specific to them. One of those methods is `filter`, which receives a predicate, and returns only the fields of the given object that match it.
Therefore, 
```ts
  take({ a: 3, b: 4 }).filter(v => v % 2 === 0)()
```
is a valid expression (and evaluates to `{ b: 4 }`), while
```ts
  //Invalid code!
  take(34).filter(v => v % 2 === 0)()
```
is invalid.

To clarify, "invalid" means that the code will fail at runtime *and* Typescript (if present) will flag it as an error.

Other entities have specific transformations defined for them as well. Also, there exist common methods, available for all types. The details are documented below. 

### RhaxCore and method classes

`take(x)` is actually just an elegant alias for `new Rhax(x)`. `rhax` is also an alias of theirs, so the following are equivalent:
```ts
new Rhax(x)
take(x)
rhax(x)
```
Use whichever one is most convenient for you.

These functions accept any value, wrap it in a `Rhax` instance and dynamically add methods to the instance, based on the value's type. These methods are grouped by type - 
a *type-specific class* exists for each data type that has special functionality, e.g. `RhaxObject` or `RhaxNumber`, and the `RhaxCommon` class contains the methods common to all types.

> Avoid using any of the type-specific classes' constructors directly. They're not intended to be called directly, and may result in unintended behavior. In constrast, the `Rhax` constructor itself _is_ safe. 

In the API below, the value contained in a given Rhax instance is denoted `value`.

### RhaxCommon

#### **map**
`RhaxCommon<T>.map<S>(fn: (value: T) => S): Rhax<S>`

Transforms the value - this function passes `value` to `fn`, and returns a Rhax instance of the result. 

Exmaple:
```typescript
  const result = take(3)
    .map(x => x * 2)
    .map(x => x + 1)
    ()
  expect(result).toBe(6);
```

#### **also**
`RhaxCommon<T>.also(fn: (value: T) => void): Rhax<T>`

`also` performs a side effect; it allows the developer to "do something" with the value without affecting it.
The most common use case for it is logging the value.

`also` is essentially a Javascript implementation of Kotlin's [also](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin/also.html).

Example:
```typescript
    const result = take(3)
    .map(x => x * 2)
    .also(x => console.log(x)) //Logs the value 
    .map(x => x + 1)
    ()
    expect(result).toBe(6) //Value remains unchanged.
```

#### **default**
`RhaxCommon<T>.default<S>(fallback: S): Rhax<NonNullable<T> | S>`

`default` returns a new Rhax instance containing the current instance's `value` if it is not `undefined` or `null`, or `fallback` otherwise.
`take(x).default(y)` is therefore functionally equivalent to `take(x).map(x => x ?? y)`.

Example:
```typescript
const person = { age: 25, height: '1.71m' };

const height = take(person.height).default('unknown')()
expect(height).toBe('1.71m');

const name = take(person.name).default('Anonymous')()
expect(name).toBe('Anonymous');
```

#### **cast**
`RhaxCommon<T>.cast<C>(): Rhax<C>`

`cast` asserts the type of `value` (it is, therefore, only usable in Typescript environments). It is functionally equivalent to `take(x).map(x => x as C)`, but is clearer in form.

Example:
```typescript
  const arr = [1, 2, null, '4', undefined, 6] //(string | number | null | undefined)[]
  const numbers = take(arr)
    .map(arr => arr.filter(el => typeof el === 'number')) //Only numbers left in array, but type is still //(string | number | null | undefined)[]
    .cast<number[]>()
  
  expect(numbers).toEqual<number[]>([1, 2, 6])
```

### RhaxNumber

#### **clamp**
`RhaxNumber.clamp(min: number, max: number): Rhax<number>`

Asserts that `value` is between `min` and `max`; if it is lesser than `min`, `min` is returned, and if it is greated than `max`, `max` is returned. Otherwise, `value` is left unchanged.

Example:
```typescript
const a = take(-1).clamp(0, 100)();
expect(a).toBe(0);


const b = take(1).clamp(0, 100)();
expect(b).toBe(1);

const c = take(800).clamp(0, 100)();
expect(c).toBe(100);
```

### RhaxObject

#### **mapFields**
`RhaxObject<O>.mapFields<W>(fn: (value: ValueOf<O>, key: keyof O, record: O) => W): Rhax<Mapped<O, W>>`

`mapFields` is similar to [Array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), but for objects. It passes every field of `value` to `fn`, and returns an object whose keys are the same, and whose values are the returned values.

Example:
```typescript
const inc = take({ a: 3, b: 4}).mapFields(n => n + 1)()
expect(inc).toEqual({ a: 4, b: 5 });
```

`fn` also provides the key of each field, and even the whole record, `value`, as second and third parameters:

```typescript
const incA = take({ a: 3, b: 4}).mapFields((n, k) => k === 'a' ? n + 1 : n)()
expect(incA).toEqual({ a: 4, b: 4 });
```

#### **filter**
`RhaxObject<O>.filter(predicate: (value: ValueOf<O>, key: keyof O, record: O) => boolean): Rhax<Partial<O>>`

`filter` is similar to [Array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter), but for objects. it returns a new object, whose fields are exactly the fields for which `predicate` returned `true`.

Exmaple:
```typescript
const odds = take({ a: 3, b: 4}).filter(n => n % 2 === 0)()
expect(odds).toEqual({ a: 3 });
```

`predicate` also provides the key of each field, and even the whole record, `value`, as second and third parameters:

```typescript
const noB = take({ a: 3, b: 4 }).filter((_, k) => k !== 'b')();
expect(noB).toEqual({ a: 3 });
```

#### **reduce**
`RhaxObject<O>.reduce<A = ValueOf<O>>(reducer: (acc: A, value: ValueOf<O>, key: keyof O, record: O) => A, initialValue: A): Rhax<A>`

`reduce` is similar to [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce), but for objects. It executes `reducer` on each element of the array, accumulating the results into a single output.

Example:
```typescript
const max = take({ a: 3, b: 4, c: 6 }).filter((max, n) => n > max ? n : max)();
expect(max).toBe(6);
```

`reducer` also provides the key of each field, and even the whole record, `value`, as second and third parameters:

```typescript
const maxNoSix = take({ a: 3, b: 4, c: 6 }).filter((max, n) => (n > max && n !== 6) ? n : max)();
expect(maxNoSix).toBe(4));
```

#### **find**
`RhaxObject<O>.find(query: (value: ValueOf<O>, key: keyof O, record: O) => boolean): Rhax<ValueOf<O> | undefined>`

`find` is similar to [Array.prototype.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find), but for objects. It searches the fields on `value`, and returns *the value* of the first one for which `query` returns true. If no such field is found, `find` returns `undefined`.

Example: 
```typescript
const even = take({ a: 3, b: 4, c: 5 }).find(n => n % 2 === 0)();
expect(even).toBe(4)
```

`query` also provides the key of each field, and even the whole record, `value`, as second and third parameters:

```typescript
const oddNotA = take({ a: 3, b: 4, c: 5 }).find((n, k) => n % 2 !== 0 && k !== 'a')();
expect(noB).toBe(5);
```

#### **findKey**
`RhaxObject<O>.findKey(query: (value: ValueOf<O>, key: keyof O, record: O) => boolean): Rhax<keyof O | undefined>`

`findKey` is similar to [Array.prototype.findIndex()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex), but for objects. It searches the fields on `value`, and returns *the key* of the first one for which `query` returns true. If no such field is found, `findKey` returns `undefined`.

Example: 
```typescript
const even = take({ a: 3, b: 4, c: 5 }).findKey(n => n % 2 === 0)();
expect(even).toBe('b')
```

`query` also provides the key of each field, and even the whole record, `value`, as second and third parameters:

```typescript
const oddNotA = take({ a: 3, b: 4, c: 5 }).findKey((n, k) => n % 2 !== 0 && k !== 'a')();
expect(oddNotA).toBe('c');
```

#### **groupBy**
`RhaxObject<O>.groupBy<T extends string | number | symbol>(tagger: (value: ValueOf<O>, key: keyof O, record: O) => T): Rhax<Record<T, ValueOf<O>[]>>`

Collects the fields of `value` into a set of lists, each field placed based on the value `tagger` returns for it.

Example: 
```typescript
const requests = {
  '#111': { status: 'pending', origin: 'foo' },
  '#123': { status: 'in_progress', origin: 'bar' },
  '#140': { status: 'completed', origin: 'foo' },
  '#140': { status: 'completed', origin: 'baz' },
};
const modulos3 = take(requests).groupBy(req => req.status)();
expect(counts).toEqual({
  'pending': [{ status: 'pending', origin: 'foo' }],
  'in_progress': [{ status: 'in_progress', origin: 'bar' }],
  'completed': [
    { status: 'completed', origin: 'foo' }, 
    { status: 'completed', origin: 'baz' }
  ]
})
```

#### **pick**
`RhaxObject<O>.pick<K extends keyof O>(keys: K[]): Rhax<Pick<O, K>>`

`pick` returns a new object, whose fields are exactly the keys in `value` whose keys are in `keys`. Therefore, `take(record).pick(keys)()` is functionally equivalent to `take(record).filter((_, k) => keys.includes(k))()`, but the former is cleaner and a little faster.

`pick` corresponds to Typescript's `Pick<T, K>` type.

Exmaple:
```typescript
const onlyA = take({ a: 3, b: 4 }).pick(['a'])()
expect(onlyA).toEqual({ a: 3 })
``` 

#### **omit**
`RhaxObject<O>.omit<K extends keyof O>(keys: K[]): Rhax<Omit<O, K>>`

`omit` returns a new object, whose fields are exactly the keys in `value` whose keys are *not* in `keys`. Therefore, `take(record).omit(keys)()` is functionally equivalent to `take(record).filter((_, k) => !keys.includes(k))()`, but the former is cleaner and a little faster.

`omit` corresponds to Typescript's `Omit<T, K>` type.

Exmaple:
```typescript
const withoutA = take({ a: 3, b: 4 }).omit(['a'])()
expect(withoutA).toEqual({ b: 4 })
```

### RhaxArray

#### **reduce**
`RhaxArray<E>.reduce<A>(reducer: (acc: A, element: E, index: number, array: E[]) => A, initialValue: A): Rhax<A>`

This is essentially a wrapper around [Array.prototype.reduce()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce).

#### **indexBy**
`RhaxArray<E>.indexBy<T extends string | number | symbol>(indexer: (element: E, index: number, array: E[]) => T): Rhax<Record<T, E>>`

`indexBy` turns an array into an object, with the key determined by the passed `indexer`.

Example: 
```typescript
const people = [{ id: '#1', foo: 'bar' }, { id: '#2', foo: 'baz' }];
const peopleById = take(people).indexBy(p => p.id)();
expect(peopleById).toEquak({
  '#1': 'bar',
  '#2': 'baz'
});
```

#### **groupBy**
`RhaxArray<E>.groupBy<T extends string | number | symbol>(tagger: (element: E, index: number, array: E[]) => T): Rhax<Record<T, E[]>>`

Collects the elements of `value` into a set of lists, each field placed based on the value `tagger` returns for it.

Example: 
```typescript
const integers = [0, 1, 2, 3, 4, 5, 6, 7];
const modulo3 = take(integers).groupBy(n => n % 3)();
expect(modulo3).toEqual({
  0: [0, 3, 6],
  1: [1, 4, 7],
  2: [2, 5]
})
```

## License
[MIT](https://choosealicense.com/licenses/mit/)