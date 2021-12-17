import { INCREMENT, DECREMENT } from "./redux/action.js";
import store from "./redux/store.js";

const { dispatch, getState, subscribe } = store;

function inCrementState() {
    dispatch({ type: INCREMENT });
    insertStateToRoot();
}

function deCrementState() {
    dispatch({ type: DECREMENT });
    insertStateToRoot();
}

// state 등록
function insertStateToRoot() {
    const root = document.getElementById("root");
    root.innerHTML = JSON.stringify(getState());
}

// dispatch 등록
function addListener() {
    const button = document.querySelectorAll("button");
    button.forEach((node) => {
        const isPlusNode = node.textContent === "+";

        if (isPlusNode) {
            node.addEventListener("click", () => inCrementState());
        } else {
            node.addEventListener("click", () => deCrementState());
        }
    });
}

function init() {
    subscribe();
    addListener();
    insertStateToRoot();
}

init();
