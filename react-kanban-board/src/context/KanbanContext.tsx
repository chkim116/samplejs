import { createContext, Dispatch, useContext, useReducer } from "react";

type KanbanColumnType = "To Do" | "In Progress" | "Done";
type TodoData = {
    id: number;
    text: string;
    date: string;
};

type InitialState = {
    [key in 1 | 2 | 3]: {
        type: KanbanColumnType;
        data: TodoData[];
    };
};

const initialState: InitialState = {
    1: {
        type: "To Do",
        data: [],
    },
    2: {
        type: "In Progress",
        data: [],
    },
    3: {
        type: "Done",
        data: [],
    },
};

const StateContext = createContext(initialState);
const DispatchContext = createContext<Dispatch<Action>>(null);

type Action = { type: "DELETE" } | { type: "ADD"; payload: TodoData };

const reducer = (state, action: Action) => {
    switch (action.type) {
        case "DELETE": {
            return state;
        }
        case "ADD": {
            return {
                ...state,
                [1]: {
                    ...state[1],
                    data: [...state[1].data, action.payload],
                },
            };
        }
        default: {
            return state;
        }
    }
};

interface Props {
    children: React.ReactNode;
}

const KanbanContext = ({ children }: Props) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <StateContext.Provider value={state}>
            <DispatchContext.Provider value={dispatch}>
                {children}
            </DispatchContext.Provider>
        </StateContext.Provider>
    );
};

export default KanbanContext;

export const useSelector = () => {
    return useContext(StateContext);
};

export const useDispatch = () => {
    return useContext(DispatchContext);
};
