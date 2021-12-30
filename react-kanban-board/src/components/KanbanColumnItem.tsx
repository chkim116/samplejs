import { Draggable } from "react-beautiful-dnd";
import styled from "@emotion/styled";
import { KanbanKey, TodoData } from "../types/kanban";
import { useDispatch } from "../context/KanbanContext";
import { RiDeleteBinLine } from "react-icons/ri";
import { css } from "@emotion/react";

interface Props {
    item: TodoData;
    index: number;
    columnId: KanbanKey;
}

const KanbanColumnItem = ({ item, index, columnId }: Props) => {
    const dispatch = useDispatch();

    const handleDelete = (e: any) => {
        const { id } = e.currentTarget.dataset;

        dispatch({
            type: "DELETE",
            payload: { kanbanKey: columnId, todoId: +id },
        });
        dispatch({ type: "SAVE_LOCAL_STORAGE" });
    };

    return (
        <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
            {(provided) => (
                <KanbanItem
                    ref={provided.innerRef}
                    style={{ ...provided.draggableProps.style }}
                    isDone={columnId === "3"}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                >
                    {columnId !== "3" && (
                        <KanbanDeleteBtn
                            onClick={handleDelete}
                            data-id={item.id}
                        >
                            <RiDeleteBinLine />
                        </KanbanDeleteBtn>
                    )}
                    <div>
                        <p>{item.text}</p>
                    </div>
                    <div>
                        <small>{item.date}</small>
                    </div>
                </KanbanItem>
            )}
        </Draggable>
    );
};

export default KanbanColumnItem;

const KanbanItem = styled.div<{ isDone: boolean }>`
    position: relative;
    padding: 1em;
    background: #f6f8f9;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    margin: 0.8em 0.5em;
    border-radius: 12px;

    /* text */
    div:nth-of-type(1) {
        margin: 0.6em 0;
        color: #333;
    }
    /* date */
    div:nth-of-type(2) {
        color: #9c9c9c;
        margin-bottom: 0.6em;
    }

    ${({ isDone }) =>
        isDone &&
        css`
            opacity: 0.3;
            /* text */
            div {
                text-decoration: line-through;
            }
        `}
`;

const KanbanDeleteBtn = styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
    background-color: #f6f8f9;

    /* delete icon */
    svg {
        color: red;
        font-size: 16px;
    }
`;
