import { createContext, Dispatch, useContext, useReducer } from "react";
import { KanbanKey, KanbanColumnType, TodoData } from "../types/kanban";

type InitialState = {
    [key in KanbanKey]: {
        type: KanbanColumnType;
        data: TodoData[];
    };
};

const initialState: InitialState = {
    "1": {
        type: "To Do",
        data: [],
    },
    "2": {
        type: "In Progress",
        data: [],
    },
    "3": {
        type: "Done",
        data: [],
    },
};

const StateContext = createContext(initialState);
const DispatchContext = createContext<Dispatch<Action>>(() => null);

type Action =
    | { type: "ADD"; payload: TodoData }
    | {
          type: "DELETE";
          payload: {
              kanbanKey: KanbanKey;
              todoId: number;
          };
      }
    | {
          type: "SAME_COLUMN_MOVE";
          payload: { sourceDroppableId: KanbanKey; newItems: TodoData[] };
      }
    | {
          type: "OTHER_COLUMN_MOVE";
          payload: {
              sourceDroppableId: KanbanKey;
              sourceNewItems: TodoData[];
              destDroppableId: KanbanKey;
              destNewItems: TodoData[];
          };
      }
    | { type: "SAVE_LOCAL_STORAGE" }
    | { type: "LOAD_LOCAL_STORAGE" };

const reducer = (state: InitialState, action: Action) => {
    switch (action.type) {
        case "ADD": {
            return {
                ...state,
                [1]: {
                    ...state[1],
                    data: [...state[1].data, action.payload],
                },
            };
        }
        case "DELETE": {
            return {
                ...state,
                [action.payload.kanbanKey]: {
                    ...state[action.payload.kanbanKey],
                    data: state[action.payload.kanbanKey].data.filter(
                        (todo) => todo.id !== action.payload.todoId
                    ),
                },
            };
        }
        case "SAME_COLUMN_MOVE": {
            return {
                ...state,
                [action.payload.sourceDroppableId]: {
                    ...state[action.payload.sourceDroppableId as KanbanKey],
                    data: [...action.payload.newItems],
                },
            };
        }
        case "OTHER_COLUMN_MOVE": {
            return {
                ...state,
                [action.payload.sourceDroppableId]: {
                    ...state[action.payload.sourceDroppableId as KanbanKey],
                    data: [...action.payload.sourceNewItems],
                },
                [action.payload.destDroppableId]: {
                    ...state[action.payload.destDroppableId as KanbanKey],
                    data: [...action.payload.destNewItems],
                },
            };
        }
        case "SAVE_LOCAL_STORAGE": {
            localStorage.setItem("kanban", JSON.stringify(state));
            return state;
        }
        case "LOAD_LOCAL_STORAGE": {
            const load = localStorage.getItem("kanban");
            return load ? JSON.parse(load) : state;
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
