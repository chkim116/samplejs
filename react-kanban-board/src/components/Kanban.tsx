import styled from "@emotion/styled";
import { useEffect } from "react";
import { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "../context/KanbanContext";
import { KanbanKey } from "../types/kanban";
import KanbanColumn from "./KanbanColumn";

const Kanban = () => {
    const [addTodoText, setAddTodoText] = useState("");
    const dispatch = useDispatch();
    const columns = useSelector();

    function handleDragEnd({ destination, source }: DropResult) {
        if (!destination || !source) return;
        const { droppableId: destDroppableId, index: destIndex } = destination;
        const { droppableId: sourceDroppableId, index: sourceIndex } = source;

        // 같은 columns에서 위치 변경 시
        if (destDroppableId === sourceDroppableId) {
            sameColumnItemChange();
            dispatch({ type: "SAVE_LOCAL_STORAGE" });
        } else {
            otherColumnItemChange();
            dispatch({ type: "SAVE_LOCAL_STORAGE" });
        }

        function sameColumnItemChange() {
            const column = columns[sourceDroppableId as KanbanKey];
            const items = [...column.data];
            const [removeItem] = items.splice(sourceIndex, 1);
            items.splice(destIndex, 0, removeItem);

            dispatch({
                type: "SAME_COLUMN_MOVE",
                payload: {
                    sourceDroppableId: sourceDroppableId as KanbanKey,
                    newItems: items,
                },
            });
        }
        function otherColumnItemChange() {
            // 드랍된 아이템
            const sourceColumn = columns[sourceDroppableId as KanbanKey];
            const destColumn = columns[destDroppableId as KanbanKey];
            const sourceItems = [...sourceColumn.data];
            const destItems = [...destColumn.data];

            // 드롭 위치로 아이템 삽입
            const target = sourceItems[sourceIndex];
            destItems.splice(destIndex, 0, target);
            // 드랍된 아이템 삭제
            sourceItems.splice(sourceIndex, 1);

            dispatch({
                type: "OTHER_COLUMN_MOVE",
                payload: {
                    sourceDroppableId: sourceDroppableId as KanbanKey,
                    sourceNewItems: sourceItems,
                    destDroppableId: destDroppableId as KanbanKey,
                    destNewItems: destItems,
                },
            });
        }
    }

    function handleChangeTodo(e: any) {
        setAddTodoText(e.target.value);
    }

    function handleAddTodo(e: any) {
        e.preventDefault();
        const date = new Date();
        const newTodo = {
            id: date.getTime(),
            text: addTodoText,
            date: date.toLocaleDateString(),
        };

        dispatch({
            type: "ADD",
            payload: newTodo,
        });
        dispatch({ type: "SAVE_LOCAL_STORAGE" });
        setAddTodoText("");
    }

    useEffect(() => {
        dispatch({ type: "LOAD_LOCAL_STORAGE" });
    }, [dispatch]);

    return (
        <>
            <KanbanItemCreator>
                <p>Write your Todo.</p>
                <KanbanItemCreatorInput onSubmit={handleAddTodo}>
                    <input
                        type="text"
                        value={addTodoText}
                        onChange={handleChangeTodo}
                        placeholder="New Todo"
                    />
                </KanbanItemCreatorInput>
            </KanbanItemCreator>
            <Container>
                <DragDropContext onDragEnd={handleDragEnd}>
                    {Object.entries(columns).map(([columnId, column]) => (
                        <KanbanBlock key={columnId}>
                            <KanbanTitle>{column.type}</KanbanTitle>
                            <KanbanColumn
                                droppableId={columnId as KanbanKey}
                                columnItem={column.data}
                            />
                        </KanbanBlock>
                    ))}
                </DragDropContext>
            </Container>
        </>
    );
};

export default Kanban;

const Container = styled.div`
    max-width: 1000px;
    width: 100%;
    margin: 0 auto;
    display: flex;
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

const KanbanItemCreator = styled.div`
    width: 100%;
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    margin: 3em 0;

    p {
        padding-left: 0.4em;
        font-size: 1.5rem;
        color: #313131;
    }
`;

const KanbanItemCreatorInput = styled.form`
    width: 100%;
    input {
        width: 100%;
        border: none;
        outline: none;
        padding: 1em 0.7em;
        font-size: 1rem;
        background-color: #f6f8f9;
        border-bottom: 1px solid #dbdbdb;
    }
`;
