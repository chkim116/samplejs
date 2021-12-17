import reducer from "./reducer.js";

const initialState = {
    count: 0,
};

function createStore(reducer) {
    let state = initialState;
    let prevState;
    let isSubscribe = false;

    function getState() {
        return state;
    }

    function subscribe() {
        isSubscribe = true;
    }

    function dispatch(action) {
        prevState = getState();
        state = reducer(state, action);
        if (isSubscribe) {
            console.log(
                `Update Reducer By ${action.type}
${JSON.stringify(prevState)} to ${JSON.stringify(getState())}`
            );
        }
    }

    return {
        getState,
        dispatch,
        subscribe,
    };
}

const store = createStore(reducer);

export default store;
