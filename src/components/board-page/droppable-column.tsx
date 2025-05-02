import {ReactNode} from "react";
import {useDroppable} from "@dnd-kit/core";

interface DroppableColumnProps {
    id: string;
    children: ReactNode;
}

export const DroppableColumn = ({id, children}: DroppableColumnProps) => {
    const {setNodeRef, isOver} = useDroppable({id});

    return (
        <div
            ref={setNodeRef}
            style={{
                backgroundColor: isOver ? "#f0f0f0" : undefined,
                minHeight: "200px",
                padding: "8px"
            }}
        >
            {children}
        </div>
    );
};