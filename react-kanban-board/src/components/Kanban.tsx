import { Fragment, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import KanbanColumn from "./KanbanColumn";

const Kanban = () => {
    const [columns, setColumns] = useState([
        {
            type: "todo",
            data: [
                { id: 1, text: "todo?" },
                { id: 2, text: "todos!" },
            ],
        },
        {
            type: "progress",
            data: [
                { id: 12, text: "pro todo?" },
                { id: 122, text: "pro todos!" },
            ],
        },
    ]);

    function handleDragEnd({ destination, source }: DropResult) {
        if (!destination && !source) return;
        const result = [...columns];
        const { droppableId, index } = destination;
        const { droppableId: sourceDroppableId, index: sourceIndex } = source;

        // 드랍된 아이템
        const target = result.find(
            (column) => column.type === sourceDroppableId
        ).data[sourceIndex];

        // 드롭된 위치로 삽입
        result
            .find((column) => column.type === droppableId)
            .data.splice(index, 0, target);

        // 드랍된 아이템 삭제
        result
            .find((column) => column.type === sourceDroppableId)
            .data.splice(sourceIndex, 1);
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
                {columns.map((column) => (
                    <Fragment key={column.type}>
                        <h1>{column.type}</h1>
                        <KanbanColumn
                            type={column.type}
                            columnItem={column.data}
                        />
                    </Fragment>
                ))}
            </DragDropContext>
        </div>
    );
};

export default Kanban;
