import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskComponent } from "./task-component";
import defaultAvatar from "../../assets/user-avatar.webp";
import { Task } from "../../pages/board-page";
import { CSSProperties } from "react";
import { GripVertical } from "lucide-react";

import '../../styles/board-page/sortable-task.css'

interface SortableTaskProps {
    task: Task;
    activeId: string | null;
    onClick: () => void;
}

export const SortableTask = ({ task, activeId, onClick }: SortableTaskProps) => {
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: task.id });

    const style: CSSProperties = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: task.id === activeId ? 0.3 : 1,
        position: "relative",
    };

    return (
        <div ref={setNodeRef} style={style}  className="sortable-task">
            <div
                {...attributes}
                {...listeners}
                className="drag-handle"
                title="Переместить"
            >
                <GripVertical size={14} color="#b6b6b6"/>
            </div>
            <div onClick={onClick}>
                <TaskComponent
                    name={task.userName}
                    avatar={task.userAvatar || defaultAvatar}
                    taskText={task.description}
                    date={task.date}
                />
            </div>
        </div>
    );
};