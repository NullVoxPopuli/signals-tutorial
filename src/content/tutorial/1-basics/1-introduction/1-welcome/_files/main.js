import { Signal } from "signal-polyfill";

let count = new Signal.State(0);
let element = document.querySelector("#counter");
