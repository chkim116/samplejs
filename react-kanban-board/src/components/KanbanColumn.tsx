import { css } from "@emotion/react";
import styled from "@emotion/styled";
import { DroppableProvided, Droppable } from "react-beautiful-dnd";
import { TodoData } from "../types/kanban";
import KanbanColumnItem from "./KanbanColumnItem";

interface Props {
    droppableId: string;
    columnItem: TodoData[];
}

const KanbanColumn = ({ droppableId, columnItem }: Props) => {
    return (
        <Droppable droppableId={droppableId}>
            {(provided: DroppableProvided, snapshot) => (
                <KanbanColumnBlock
                    isDraggingOver={snapshot.isDraggingOver}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    {columnItem.map((item, index) => (
                        <KanbanColumnItem
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

const KanbanColumnBlock = styled.div<{ isDraggingOver: boolean }>`
    ${({ isDraggingOver }) =>
        isDraggingOver
            ? css`
                  background-color: #fafbfc;
              `
            : css`
                  background-color: #f6f8f9;
              `}
    margin-bottom: 2em;
`;
