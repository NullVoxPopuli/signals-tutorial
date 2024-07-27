import { Signal } from "signal-polyfill";
import { effect } from "signal-utils/subtle/microtask-effect";

let count = new Signal.State(0);
let element = document.querySelector("#counter");
let doubledElement = document.querySelector("#doubled");

element.addEventListener("click", () => count.set(count.get() + 1));

effect(() => (element.innerHTML = `count is ${count.get()}`));

effect(() => {
  let doubled = count.get() * 2;

  doubledElement.innerHTML = `doubled is ${doubled}`;
});
