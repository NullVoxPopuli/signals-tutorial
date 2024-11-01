---
type: lesson
title: Cached Data 
focus: /index.html
---

# Cached Data 

Cahing data is useful when you either have an expensive computation that you don't want to derive every time you pull on the data or if you want to retain referential integrity of the data between multiple accesses. 



```js
import { Signal } from 'signal-polyfill';

let a = new Signal.State(0);
let b = new Signal.State(0);
```
