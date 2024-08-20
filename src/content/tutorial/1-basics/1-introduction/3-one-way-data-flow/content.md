---
type: lesson
title: One-way Data Flow
focus: /index.html
---

# One-way Data Flow

Signals can be used to create UIs with one-way data flow,
where data flows top-down through the view hierarchy
and the UI is computed as a pure function of this state.
Popularized by React, this is commonly expressed as `ui = f(state)`.

_In this lesson we'll refactor our counter to be created as a pure function of state_

First, in the HTML, we delete the static markup, because we're going to create it dynamically:
```html del={2-4}
  <div id="app">
    <div class="card">
      <button id="counter" type="button">text here</button>
    </div>
  </div>
```

In `main.js`, we change the element to the `#app`:
```js del={1} add={2}
let element = document.querySelector("#counter");
let element = document.querySelector("#app");
```

We then wrap `count` in a top-level `state` object.
You can imagine extending it with any number of other signals.
It's assigned to the `window` because we'll use it in an inline HTML event handler ahead:
```js del={1} add={2-4}
let count = new Signal.State(0);
let state = window.state = {
  count: new Signal.State(0),
};
```



We then add a `createUI` function that has a `state` argument and returns an HTML string.
Instead of adding an imperative click handler, we have a declarative `onclick` handler in our markup:
```js del={1-3} add={5-15}
element.addEventListener("click", () => count.set(count.get() + 1));

effect(() => (element.innerText = `count is ${count.get()}`));

function createUI(state) {
  return `
    <div class="card">
      <button id="counter" type="button" onclick="state.count.set(state.count.get() + 1)">
        count is ${state.count.get()}
      </button>
    </div>
  `;
};

element.innerHTML = createUI(state);
```

This now displays the initial markup that we expect,
but clicking the button does not update the DOM.

> Note that this raw HTML string template relies on
> the global `window.state` in the inline `onclick` handler.
> Although it works for simple examples,
> this is where a framework comes in to provide better declarative event handling,
> secure escaping, improved performance, DOM element stability, and other important benefits.

To fix our bug and make the UI reactively update whenever state changes:
```js add={3-5} del={1}
element.innerHTML = createUI(state);

effect(() => {
  element.innerHTML = createUI(state);
});
```

We now have our UI created declaratively with dynamic data and one-way data flow.
Whenever a signal that's read inside `createUI` changes,
the function re-runs and its returned HTML string is re-inserted into the DOM.

To understand the final state of the DOM, 
we only need to reason about the current state of our data
and the declarative markup inside the components of `createUI`,
starting at the top and flowing downward.
You can imagine `createUI` calling many functions to construct its markup,
and each function - or component - is simple to reason about,
because all you need to consider is the state it receives and the markup it returns.