import { Signal } from "signal-polyfill";
import { effect } from "signal-utils/subtle/microtask-effect";

let count = new Signal.State(0);
let element = document.querySelector("#counter");

element.addEventListener("click", () => count.set(count.get() + 1));

effect(() => (element.innerText = `count is ${count.get()}`));
