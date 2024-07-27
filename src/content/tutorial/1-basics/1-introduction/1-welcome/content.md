---
type: lesson
title: Intro to Signals 
focus: /counter.js
---

# Intro to Signals

Signals are fine-grained reactivity, for everyone -- aiming to solve the interop problem between the various JavaScript ecosystems. 
The [proposal to TC39](https://github.com/tc39/proposal-signals/tree/main) is currently in [Stage 1](https://tc39.es/process-document/), and is based on design input from the authors/maintainers of [Angular](https://angular.io/), [Bubble](https://bubble.io/), [Ember](https://emberjs.com/), [FAST](https://www.fast.design/), [MobX](https://mobx.js.org/), [Preact](https://preactjs.com/), [Qwik](https://qwik.dev/), [RxJS](https://rxjs.dev/), [Solid](https://www.solidjs.com/), [Starbeam](https://www.starbeamjs.com/), [Svelte](https://svelte.dev/), [Vue](https://vuejs.org/), [Wiz](https://blog.angular.io/angular-and-wiz-are-better-together-91e633d8cd5a), and more…

---


This tutorial is made with [tutorialkit](https://tutorialkit.dev/), 

## Who is this for?

There are sort of 3 auidences for working with signals.
- framework authors (who would keep their existing APIs the same, and swap the internal implementation with Signals)
- app-developers, who wouldn't change how they work, they keep using the same APIs
- and library authors, or folks working in vanilla JavaScript for maximum reach -- **this tutorial will focus on this audience, as the other ways of using Signals would require choosing a library/framework**.

## How do you use Signals?

Our goal for this lesson is to make a button that increments a count when clicked.

Starting with this code,
```js
import { Signal } from 'signal-polyfill';

export function counter(element) {
    let count = new Signal.State(0);
}
```
we see that we have an element passed to our function, but nothing has happened with that element -- in this case the element is a button.

First, we'll need to add an event listener to the element.
```js add={6-7} 
import { Signal } from 'signal-polyfill';

export function counter(element) {
    let count = new Signal.State(0);

    element.addEventListener('click', () => 
        count.set(count.get() + 1));
}
```
But this alone is not enough. There isn't a way yet to update the element's text. In a framework that may happen automatically via a templating system, but in Vanilla JavaScript, we have to do that ourselves, and via 

```js add={3,8}
import { Signal } from "signal-polyfill";

import { effect } from "signal-utils/subtle/microtask-effect";

export function counter(element) {
    let count = new Signal.State(0);

    effect(() => (element.innerHTML = `count is ${count.get()}`));

    element.addEventListener("click", 
        () => count.set(count.get() + 1));
}
```

Here we use the "micratask-effect" from [signal-utils](https://github.com/proposal-signals/signal-utils). 
Note that signal-utils is a separate project from the TC39 proposal, and effects are not included in the proposal due to how effect _timing_ can very greatly between libraries and frameworks.
