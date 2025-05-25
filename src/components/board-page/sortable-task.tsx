import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskComponent } from "./task-component";
import { Task } from "../../pages/board-page";
import { CSSProperties, useState } from "react";
import { GripVertical } from "lucide-react";

import MenuIcon from '../../assets/menu.svg';
import '../../styles/board-page/sortable-task.css';

interface SortableTaskProps {
    task: Task;
    activeId: string | null;
    onClick: () => void;
    onTasksChange: () => void;
}

export const SortableTask = ({ task, activeId, onClick, onTasksChange }: SortableTaskProps) => {
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

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

    const token = localStorage.getItem('token');
    const userId = 2;

    const handleDeleteTask = async () => {
        try {
            const response = await fetch(`/api/item/delete/${task.id}`, {
                method: 'DELETE',
                headers: {
                    'accept': 'text/plain',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                onTasksChange(); // <--- обновляем список
            }
        } catch (error) {
            console.error(error);
            alert('Ошибка запроса');
        }
        setIsConfirmDeleteOpen(false);
        setIsMenuOpen(false);
    };

    const handleAssignToSelf = async () => {
        try {
            const response = await fetch(`/api/item/add-user-to-item/${task.id}`, {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userId)
            });

            if (response.ok) {
                onTasksChange();
            }
        } catch (error) {
            console.error(error);
            alert('Ошибка запроса');
        }

        setIsMenuOpen(false);
    };

    return (
        <div ref={setNodeRef} style={style} className="sortable-task">
            <div {...attributes} {...listeners} className="drag-handle" title="Переместить">
                <GripVertical size={14} color="#b6b6b6" />
            </div>

            <div className="task-menu-wrapper">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setIsMenuOpen(!isMenuOpen);
                    }}
                    className="task-menu-button"
                >
                    <img src={MenuIcon} alt="Меню" />
                </button>

                {isMenuOpen && (
                    <div className="task-menu-modal">
                        <button onClick={() => setIsConfirmDeleteOpen(true)}>Удалить задачу</button>
                        <button onClick={handleAssignToSelf}>Назначить себя исполнителем</button>
                    </div>
                )}
            </div>

            {isConfirmDeleteOpen && (
                <div className="confirm-modal">
                    <p>Вы уверены, что хотите удалить задачу?</p>
                    <button onClick={handleDeleteTask}>Да</button>
                    <button onClick={() => setIsConfirmDeleteOpen(false)}>Отмена</button>
                </div>
            )}

            {/* onClick только на компонент задачи */}
            <div onClick={onClick}>
                <TaskComponent task={task} />
            </div>
        </div>
    );
};
