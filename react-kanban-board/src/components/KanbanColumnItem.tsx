import { Draggable } from "react-beautiful-dnd";
import styled from "@emotion/styled";
import { KanbanKey, TodoData } from "../types/kanban";
import { useDispatch } from "../context/KanbanContext";
import { RiDeleteBinLine } from "react-icons/ri";

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
    };

    return (
        <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
            {(provided) => (
                <KanbanItem
                    ref={provided.innerRef}
                    style={{ ...provided.draggableProps.style }}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                >
                    <KanbanDeleteBtn onClick={handleDelete} data-id={item.id}>
                        <RiDeleteBinLine />
                    </KanbanDeleteBtn>
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

const KanbanItem = styled.div`
    position: relative;
    padding: 1em;
    background: #ffffff;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    margin: 0.8em 0.5em;
    border-radius: 12px;

    /* text */
    div:nth-of-type(1) {
        margin: 0.6em 0;
    }
    /* date */
    div:nth-of-type(2) {
        color: #9c9c9c;
        margin-bottom: 0.6em;
    }
`;

const KanbanDeleteBtn = styled.button`
    position: absolute;
    top: 5px;
    right: 5px;
    cursor: pointer;
    background-color: #ffffff;

    /* delete icon */
    svg {
        color: red;
        font-size: 16px;
    }
`;
