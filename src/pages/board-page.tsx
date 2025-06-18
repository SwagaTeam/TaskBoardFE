import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchStatusesByBoard } from "../store/statusSlice";
import { RootState } from "../store";
import { DndContext, DragOverlay, closestCenter, PointerSensor, useSensor, useSensors, useDroppable } from "@dnd-kit/core";
import { SortableContext, arrayMove, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { TaskComponent } from "../components/board-page/task-component";
import { SortableTask } from "../components/board-page/sortable-task";
import { TaskSidebar } from "../components/board-page/task-sidebar";
import { BoardSelectPanel } from "../components/board-page/board-select-panel";
import { SortButton } from "../components/board-page/sort-button";
import defaultAvatar from "../assets/user-avatar.webp";
import "../styles/board-page/board-page.css";
import {CreateTaskModal} from "../components/create-task-modal.tsx";
import {useParams} from "react-router-dom";
import {LoadingColumn} from "../components/board-page/loading-column.tsx";

export interface Task {
    id: string;
    userName?: string;
    userAvatar?: string;
    title: string;
    description: string;
    startDate: string;
    expectedEndDate: string;
    category: string;
    priority: number;
    priorityText: string;
    contributor: string;
    businessId: number;
    itemTypeId: number;
    contributors: [string];
}

interface BoardPageProps {
    tasks?: Task[];
    boardId: number;
}

export const BoardPage = ({ tasks = [] }: BoardPageProps) => {
    const dispatch = useDispatch();
    const [taskList, setTaskList] = useState<Task[]>(tasks);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const { projectId, boardId } = useParams<{ projectId: string; boardId?: string }>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedStatusId, setSelectedStatusId] = useState<number | null>(null);
    const sensors = useSensors(useSensor(PointerSensor));

    const statuses = useSelector((state: RootState) => state.statuses.byBoard[boardId] || []);
    const statusesStatus = useSelector((state: RootState) => state.statuses.status);

    const fetchTasks = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`/api/item/board/${boardId}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });

            const data = await response.json();

            const formattedTasks: Task[] = data.map((item: any) => ({
                id: item.id.toString(),
                author: item.author,
                userAvatar: defaultAvatar,
                title: item.title,
                description: item.description,
                startDate: item.startDate,
                expectedEndDate: item.expectedEndDate,
                category: item.status.name,
                priority: item.priority,
                priorityText: item.priorityText,
                contributor: item.contributor,
                contributors: item.contributors,
                businessId: item.businessId,
                itemTypeId: item.itemTypeId,
            }));

            setTaskList(formattedTasks);
        } catch (error) {
            console.error("Ошибка при загрузке задач:", error);
        }
    };

    const handleTaskCreated = () => {
        fetchTasks();
        setIsModalOpen(false);
    };

    useEffect(() => {
        document.title = "Доска";
        fetchTasks();
        dispatch(fetchStatusesByBoard(boardId));
    }, [dispatch, boardId]);

    const getTasksByCategory = (category: string) =>
        taskList.filter((task) => task.category === category);

    const handleDragStart = (event: any) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = async (event: any) => {
        const { active, over } = event;
        setActiveId(null);
        if (!over) return;

        const activeTask = taskList.find((t) => t.id === active.id);
        if (!activeTask) return;

        const isOverColumn = statuses.some((status) => status.name === over.id);
        const isOverTask = taskList.find((t) => t.id === over.id);
        const token = localStorage.getItem("token");

        // Сохраняем предыдущее состояние для возможного отката
        const previousTaskList = [...taskList];

        if (isOverColumn) {
            const newStatus = statuses.find((status) => status.name === over.id);
            if (!newStatus) return;

            // Оптимистичное обновление: сразу меняем категорию задачи
            setTaskList((prev) =>
                prev.map((task) =>
                    task.id === active.id
                        ? { ...task, category: newStatus.name }
                        : task
                )
            );

            try {
                // Отправляем запрос на сервер
                const response = await fetch(`/api/item/change-status/${activeTask.id}`, {
                    method: "POST",
                    headers: {
                        accept: "*/*",
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(newStatus.id),
                });

                if (!response.ok) {
                    throw new Error("Ошибка при изменении статуса задачи");
                }
            } catch (error) {
                console.error("Ошибка при отправке запроса на изменение статуса:", error);
                // Откатываем изменения в случае ошибки
                setTaskList(previousTaskList);
                // Можно добавить уведомление об ошибке
                // toast.error("Не удалось изменить статус задачи.");
            }
        } else if (isOverTask) {
            if (activeTask.category !== isOverTask.category) {
                const newStatus = statuses.find((status) => status.name === isOverTask.category);
                if (!newStatus) return;

                // Оптимистичное обновление: сразу меняем категорию задачи
                setTaskList((prev) =>
                    prev.map((task) =>
                        task.id === active.id
                            ? { ...task, category: isOverTask.category }
                            : task
                    )
                );

                try {
                    // Отправляем запрос на сервер
                    const response = await fetch(`/api/item/change-status/${activeTask.id}`, {
                        method: "POST",
                        headers: {
                            accept: "*/*",
                            Authorization: `Bearer ${token}`,
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify(newStatus.id),
                    });

                    if (!response.ok) {
                        throw new Error("Ошибка при изменении статуса задачи");
                    }
                } catch (error) {
                    console.error("Ошибка при отправке запроса на изменение статуса:", error);
                    setTaskList(previousTaskList);
                }
            } else {
                const tasksInCategory = getTasksByCategory(activeTask.category);
                const oldIndex = tasksInCategory.findIndex((t) => t.id === active.id);
                const newIndex = tasksInCategory.findIndex((t) => t.id === over.id);
                const newOrdered = arrayMove(tasksInCategory, oldIndex, newIndex);
                const updatedTasks = taskList.filter((t) => t.category !== activeTask.category);
                setTaskList([...updatedTasks, ...newOrdered]);
                // Если требуется обновить порядок на сервере, можно добавить запрос здесь
            }
        }
    };

    const activeTask = taskList.find((t) => t.id === activeId);
    const DroppableColumn = ({ id, children }: { id: string; children: React.ReactNode }) => {
        const { setNodeRef } = useDroppable({ id });
        return (
            <div ref={setNodeRef} style={{ flex: 1, minHeight: "200px" }}>
                {children}
            </div>
        );
    };

    if (!boardId) {
        return (
            <div style={{ display: "flex" }}>
                <BoardSelectPanel />
                <div>
                    <h2>Проект {projectId}</h2>
                    <p>У этого проекта пока нет досок</p>
                </div>
            </div>
        );
    }

    return (
        <div style={{ display: "flex" }}>
            <BoardSelectPanel />
            <DndContext
                collisionDetection={closestCenter}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
                sensors={sensors}
            >
                <div className="board-columns">
                    {statusesStatus === 'loading' ? (
                        <div className="loading-columns-container">
                            {Array.from({ length: 4 }).map((_, index) => (
                                <LoadingColumn key={index} />
                            ))}
                        </div>
                    ) : (
                        <>
                            {[...statuses]
                                .sort((a, b) => a.order - b.order)
                                .map((status) => {
                                    const tasks = getTasksByCategory(status.name);
                                    return (
                                        <div className="board-column" key={status.name}>
                                            <div style={{ display: 'flex' }}>
                                                <h1
                                                    className={
                                                        status.isDone
                                                            ? 'status-title done'
                                                            : status.isRejected
                                                                ? 'status-title rejected'
                                                                : 'status-title'
                                                    }
                                                >
                                                    {status.name}
                                                </h1>
                                                <SortButton
                                                    onSortChange={(sortType) => {
                                                        setTaskList((prev) => {
                                                            const currentTasks = prev.filter((task) => task.category === status.name);
                                                            const otherTasks = prev.filter((task) => task.category !== status.name);

                                                            const sorted = [...currentTasks].sort((b, a) => {
                                                                if (sortType === 'date') {
                                                                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                                                                }
                                                                return 0;
                                                            });

                                                            return [...otherTasks, ...sorted];
                                                        });
                                                    }}
                                                />
                                            </div>

                                            <DroppableColumn id={status.name} status={status}>
                                                <SortableContext
                                                    items={tasks.map((t) => t.id)}
                                                    strategy={verticalListSortingStrategy}
                                                >
                                                    {!status.isDone && !status.isRejected && (
                                                        <button
                                                            className="column-add-task-btn"
                                                            onClick={() => {
                                                                setSelectedStatusId(status.id); // Сохраняем statusId
                                                                setIsModalOpen(true);
                                                            }}
                                                        >
                                                            Добавить задачу
                                                        </button>
                                                    )}
                                                    {tasks.map((task) => (
                                                        <SortableTask
                                                            key={task.id}
                                                            task={task}
                                                            activeId={activeId}
                                                            onClick={() => setSelectedTask(task)}
                                                            onTasksChange={fetchTasks}
                                                        />
                                                    ))}
                                                </SortableContext>
                                            </DroppableColumn>
                                        </div>
                                    );
                                })}
                            {isModalOpen && selectedStatusId !== null && (
                                <CreateTaskModal
                                    projectId={projectId}
                                    boardId={boardId}
                                    statusId={selectedStatusId}
                                    isOpen={isModalOpen}
                                    onClose={() => {
                                        setIsModalOpen(false);
                                        setSelectedStatusId(null);
                                    }}
                                    onTaskCreated={handleTaskCreated}
                                />
                            )}
                        </>
                    )}
                </div>



                {selectedTask && (
                    <TaskSidebar task={selectedTask} onClose={() => setSelectedTask(null)} onTasksChange={fetchTasks}/>
                )}

                <DragOverlay>
                    {activeTask ? (
                        <TaskComponent task = {activeTask}/>
                    ) : null}
                </DragOverlay>
            </DndContext>
        </div>
    );
};
