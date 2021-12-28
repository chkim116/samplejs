import { Draggable } from "react-beautiful-dnd";
import styled from "@emotion/styled";

interface Props {
    item: any;
    index: number;
}

const KanbanColumnItem = ({ item, index }: Props) => {
    return (
        <Draggable key={item.id} draggableId={`${item.id}`} index={index}>
            {(provided) => (
                <KanbanItem
                    ref={provided.innerRef}
                    style={{ ...provided.draggableProps.style }}
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                >
                    <div>
                        <p>{item.text}</p>
                    </div>
                    <div>
                        <small>{item.date}</small>
                    </div>
                    <div>
                        <span>
                            <small>{item.tag}</small>
                        </span>
                    </div>
                </KanbanItem>
            )}
        </Draggable>
    );
};

export default KanbanColumnItem;

const KanbanItem = styled.div`
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
    /* tag */
    div:nth-of-type(3) {
        span {
            border-radius: 6px;
            padding: 0.1em 0.3em;
            background-color: #dbdbdb;
        }
    }
`;
