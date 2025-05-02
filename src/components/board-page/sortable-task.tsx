import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskComponent } from "./task-component";
import defaultAvatar from "../../assets/user-avatar.webp";
import { Task } from "../../pages/board-page";
import { CSSProperties } from "react";

interface SortableTaskProps {
    task: Task;
    activeId: string | null;
}

export const SortableTask = ({ task, activeId }: SortableTaskProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id });

    const style: CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : task.id === activeId ? 0.3 : 1,
        pointerEvents: isDragging ? "none" : "auto",
    };

    return (
        <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
            <TaskComponent
                name={task.userName}
                avatar={task.userAvatar || defaultAvatar}
                taskText={task.description}
                date={task.date}
            />
        </div>
    );
};