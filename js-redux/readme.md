# custom redux w/ vanila js

count sample

```js
import store from "./redux/store.js";

const { dispatch, getState, subscribe } = store;

// 최초 한번 구독 선언
subscribe();

function inCrementState() {
    dispatch({ type: INCREMENT });
}

function deCrementState() {
    dispatch({ type: DECREMENT });
}

node.addEventListener("click", () => inCrementState());
node.addEventListener("click", () => deCrementState());
```
