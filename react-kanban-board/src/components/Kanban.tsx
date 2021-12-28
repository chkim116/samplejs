import { Fragment, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import KanbanColumn from "./KanbanColumn";

const Kanban = () => {
    const [columns, setColumns] = useState({
        1: {
            type: "todo",
            data: [
                { id: 1, text: "todo?" },
                { id: 2, text: "todos!" },
            ],
        },
        2: {
            type: "progress",
            data: [
                { id: 12, text: "pro todo?" },
                { id: 122, text: "pro todos!" },
            ],
        },
    });

    function handleDragEnd({ destination, source }: DropResult) {
        if (!destination || !source) return;
        const { droppableId: destDroppableId, index: destIndex } = destination;
        const { droppableId: sourceDroppableId, index: sourceIndex } = source;

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
                    ...prev[sourceDroppableId],
                    data: [...sourceItems],
                },
                [destDroppableId]: {
                    ...prev[destDroppableId],
                    data: [...destItems],
                },
            };
        });
    }

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <DragDropContext onDragEnd={handleDragEnd}>
                {Object.entries(columns).map(([columnId, column]) => (
                    <Fragment key={columnId}>
                        <h1>{column.type}</h1>
                        <KanbanColumn
                            droppableId={columnId}
                            columnItem={column.data}
                        />
                    </Fragment>
                ))}
            </DragDropContext>
        </div>
    );
};

export default Kanban;
