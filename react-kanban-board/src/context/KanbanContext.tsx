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
      };

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
