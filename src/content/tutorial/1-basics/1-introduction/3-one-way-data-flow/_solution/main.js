import { Signal } from "signal-polyfill";
import { effect } from "signal-utils/subtle/microtask-effect";

let state = window.state = {
  count: new Signal.State(0),
};
let element = document.querySelector("#app");

function App(state) {
  return `
    <div class="card">
      ${Counter(state)}
    </div>
  `;
};

function Counter(state) {
  return `
    <button id="counter" type="button" onclick="state.count.set(state.count.get() + 1)">
      count is ${state.count.get()}
    </button>
  `;
}

effect(() => {
  element.innerHTML = App(state);
});
