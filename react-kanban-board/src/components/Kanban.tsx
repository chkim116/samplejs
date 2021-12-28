import styled from "@emotion/styled";
import { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import KanbanColumn from "./KanbanColumn";

const Kanban = () => {
    const [columns, setColumns] = useState({
        1: {
            type: "To Do",
            data: [
                {
                    id: 1,
                    text: "todo?",
                    date: new Date().toLocaleDateString(),
                    tag: "new",
                },
                {
                    id: 2,
                    text: "todos!",
                    date: new Date().toLocaleDateString(),
                    tag: "new",
                },
            ],
        },
        2: {
            type: "In Progress",
            data: [
                {
                    id: 12,
                    text: "pro todo?",
                    date: new Date().toLocaleDateString(),
                    tag: "new",
                },
                {
                    id: 122,
                    text: "pro todos!",
                    date: new Date().toLocaleDateString(),
                    tag: "new",
                },
            ],
        },
        3: {
            type: "Done",
            data: [],
        },
    });

    function handleDragEnd({ destination, source }: DropResult) {
        if (!destination || !source) return;
        const { droppableId: destDroppableId, index: destIndex } = destination;
        const { droppableId: sourceDroppableId, index: sourceIndex } = source;

        // 같은 columns에서 위치 변경 시
        if (destDroppableId === sourceDroppableId) {
            sameColumnItemChange();
        } else {
            otherColumnItemChange();
        }

        function sameColumnItemChange() {
            const column = columns[sourceDroppableId];
            const items = [...column.data];
            const [removeItem] = items.splice(sourceIndex, 1);
            items.splice(destIndex, 0, removeItem);

            setColumns((prev) => {
                return {
                    ...prev,
                    [sourceDroppableId]: {
                        ...column,
                        data: [...items],
                    },
                };
            });
        }
        function otherColumnItemChange() {
            // 드랍된 아이템
            const sourceColumn = columns[sourceDroppableId];
            const destColumn = columns[destDroppableId];
            const sourceItems = [...sourceColumn.data];
            const destItems = [...destColumn.data];

            // 드롭 위치로 아이템 삽입
            const target = sourceItems[sourceIndex];
            destItems.splice(destIndex, 0, target);
            // 드랍된 아이템 삭제
            sourceItems.splice(sourceIndex, 1);

            setColumns((prev) => {
                return {
                    ...prev,
                    [sourceDroppableId]: {
                        ...sourceColumn,
                        data: [...sourceItems],
                    },
                    [destDroppableId]: {
                        ...destColumn,
                        data: [...destItems],
                    },
                };
            });
        }
    }

    return (
        <Container>
            <DragDropContext onDragEnd={handleDragEnd}>
                {Object.entries(columns).map(([columnId, column]) => (
                    <KanbanBlock key={columnId}>
                        <KanbanTitle>{column.type}</KanbanTitle>
                        <KanbanColumn
                            droppableId={columnId}
                            columnItem={column.data}
                        />
                    </KanbanBlock>
                ))}
            </DragDropContext>
        </Container>
    );
};

export default Kanban;

const Container = styled.div`
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const KanbanBlock = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const KanbanTitle = styled.h1`
    font-size: 1.2rem;
    padding: 0.5em;
    text-align: left;
`;
