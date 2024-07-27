---
type: lesson
title: Deriving Data 
focus: /index.html
---

# Deriving Data 

Deriving data is one of the key concepts with Reactivity, as it allows the UI to "settle" efficiently without the need to run extra computation cycles (or worse: re-renders).

_In this lesson we'll add secondary data to our counter that will double the value_

First, in the HTML, we need to add a new element:
```html add={5}
  <div id="app">
    <div class="card">
      <button id="counter" type="button">text here</button>
    </div>
    <div id="doubled"></div>
  </div>
```

Then in our `main.js`, we'll need to query for that element:
```js add={6}
import { Signal } from "signal-polyfill";
import { effect } from "signal-utils/subtle/microtask-effect";

let count = new Signal.State(0);
let element = document.querySelector("#counter");
let doubledElement = document.querySelector("#doubled");
```

and then we need to create another way to sync the data to the content of the `doubledElement`.
Beneath our previous effect, we can add another
```js add={3-7}
effect(() => (element.innerHTML = `count is ${count.get()}`));

effect(() => {
    let doubled = count.get() * 2;
    doubledElement.innerHTML = `doubled is ${doubled}`;
});
```

The derived data part here is the assignment:
```js
let doubled = count.get() * 2;
```
This is possibly over-simplified, but the way we read this is that `doubled` is the result of the computation on the right-hand side of the equals.

This will become important later, as we dive more in to deriving more complex data, and introduce class-based data derivation.
