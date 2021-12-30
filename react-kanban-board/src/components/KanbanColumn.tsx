import styled from "@emotion/styled";
import { DroppableProvided, Droppable } from "react-beautiful-dnd";
import { KanbanKey, TodoData } from "../types/kanban";
import KanbanColumnItem from "./KanbanColumnItem";

interface Props {
    droppableId: KanbanKey;
    columnItem: TodoData[];
}

const KanbanColumn = ({ droppableId, columnItem }: Props) => {
    return (
        <Droppable droppableId={droppableId}>
            {(provided: DroppableProvided) => (
                <KanbanColumnBlock
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {columnItem.map((item, index) => (
                        <KanbanColumnItem
                            columnId={droppableId}
                            key={item.id}
                            item={item}
                            index={index}
                        />
                    ))}
                    {provided.placeholder}
                </KanbanColumnBlock>
            )}
        </Droppable>
    );
};

export default KanbanColumn;

const KanbanColumnBlock = styled.div`
    background-color: transparent;
    margin-bottom: 2em;
`;
