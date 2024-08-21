---
type: lesson
title: One-way Data Flow
focus: /main.js
---

# One-way Data Flow

Signals can be used to create UIs with one-way data flow,
where state is passed top-down through the view hierarchy
and the UI is computed as a pure function of state.
Popularized by React, this is commonly expressed as `ui = f(state)`.

In `main.js`, the app's state is initialized with a `count` signal.
You can imagine extending it with any number of other signals.
It's assigned to the `window` because we'll use it in an inline HTML event handler ahead:

```js
let state = window.state = {
	count: new Signal.State(0),
};
```

We then add two functions, `App` and `Counter`.
Each has a `state` argument and returns an HTML string,
providing a basic approximation of components:

```js add={1-17}
function App(state) {
	return `
    <div class="card">
      ${Counter(state)}
    </div>
  `;
}

function Counter(state) {
	return `
    <button onclick="state.count.set(state.count.get() + 1)">
      count is ${state.count.get()}
    </button>
  `;
}

element.innerHTML = App(state);
```

This now displays the initial markup that we expect,
but clicking the button does not update the DOM.

> Note that this raw HTML string template relies on
> the global `window.state` in the inline `onclick` handler.
> Although it works for simple examples,
> this is where a framework comes in to provide proper
> declarative event handling that can access the component's local scope.
> Frameworks also provide secure escaping, DOM element stability,
> improved performance, and other important benefits.

To fix our bug and make the UI reactively update on state changes:

```js add={3-5} del={1}
element.innerHTML = App(state);

effect(() => {
	element.innerHTML = App(state);
});
```

Whenever a signal that's read inside `App` or a descendant changes,
the function re-runs and its returned HTML string is re-inserted into the DOM.
We now have our reactive UI created declaratively with dynamic data and one-way data flow.

To understand the final state of the DOM,
we need to reason about only the current state of our data
and the declarative markup inside the components of `App`,
starting at the top and flowing downward.
You can imagine `App` and `Counter` calling many functions to construct their markup,
forming a tree where each component is simple to reason about,
because all you need to consider is the state a component receives and the markup it returns.
