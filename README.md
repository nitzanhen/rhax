# Rhax
![license](https://img.shields.io/github/license/NitzanHen/rhax?color=blue)
![npm](https://img.shields.io/npm/v/rhax?color=green)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/rhax?color=yellow)

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

### RhaxCommon
### RhaxNumber
### RhaxObject

## License
[MIT](https://choosealicense.com/licenses/mit/)