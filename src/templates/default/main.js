import { counter } from "./counter.js";
import "./style.css";

document.querySelector("#app").innerHTML = `
  <div>
    <a href="https://vitejs.dev" target="_blank">
      <img src="https://raw.githubusercontent.com/tc39/proposal-signals/main/Signals.svg" class="logo" alt="Signals logo" />
    </a>
    <h1>Hello Signals!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`;

counter(document.querySelector("#counter"));
