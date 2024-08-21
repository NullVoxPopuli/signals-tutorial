import { Signal } from "signal-polyfill";
import { effect } from "signal-utils/subtle/microtask-effect";

let state = window.state = {
  count: new Signal.State(0),
};
let element = document.querySelector("#app");
