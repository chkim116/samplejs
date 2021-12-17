import { INCREMENT, DECREMENT } from "./redux/action.js";
import store from "./redux/store.js";

const { dispatch, getState, subscribe } = store;

function handleInCrementState() {
    dispatch({ type: INCREMENT });
    insertStateToRoot();
}

function handleDeCrementState() {
    dispatch({ type: DECREMENT });
    insertStateToRoot();
}

// state를 HTML로
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
            node.addEventListener("click", () => handleInCrementState());
        } else {
            node.addEventListener("click", () => handleDeCrementState());
        }
    });
}

function init() {
    subscribe();
    addListener();
    insertStateToRoot();
}

init();
