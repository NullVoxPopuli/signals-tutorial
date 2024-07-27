import { Signal } from "signal-polyfill";

import { effect } from "signal-utils/subtle/microtask-effect";

export function counter(element) {
  let count = new Signal.State(0);

  effect(() => (element.innerHTML = `count is ${count.get()}`));

  element.addEventListener("click", () => count.set(count.get() + 1));
}
