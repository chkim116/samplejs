import { DroppableProvided, Droppable } from "react-beautiful-dnd";
import KanbanColumnItem from "./KanbanColumnItem";

interface Props {
    droppableId: string;
    columnItem: any;
}

const KanbanColumn = ({ droppableId, columnItem }: Props) => {
    return (
        <Droppable droppableId={droppableId}>
            {(provided: DroppableProvided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                    {columnItem.map((item, index) => (
                        <KanbanColumnItem
                            key={item.id}
                            itemId={item.id}
                            text={item.text}
                            index={index}
                        />
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
    );
};

export default KanbanColumn;
