import { Draggable } from "react-beautiful-dnd";

interface Props {
    itemId: number;
    text: string;
    index: number;
}

const KanbanColumnItem = ({ itemId, text, index }: Props) => {
    return (
        <Draggable key={itemId} draggableId={`${itemId}`} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                >
                    {text}
                </div>
            )}
        </Draggable>
    );
};

export default KanbanColumnItem;
