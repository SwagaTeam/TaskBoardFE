import {useEffect, useState} from "react";
import {
    DndContext,
    DragOverlay,
    closestCenter,
    PointerSensor,
    useSensor,
    useSensors,
    useDroppable,
} from "@dnd-kit/core";
import {SortableContext, arrayMove, verticalListSortingStrategy} from "@dnd-kit/sortable";

import {TaskComponent} from "../components/board-page/task-component";
import {SortableTask} from "../components/board-page/sortable-task";
import {TaskSidebar} from "../components/board-page/task-sidebar";
import {BoardSelectPanel} from "../components/board-page/board-select-panel.tsx";
import {boards} from "../mock/boards-mock.ts";
import {SortButton} from "../components/board-page/sort-button.tsx";

import '../styles/board-page/board-page.css';
import defaultAvatar from '../assets/user-avatar.webp';


export interface Task {
    id: string;
    userName: string;
    userAvatar?: string;
    description: string;
    date: string;
    category: "todo" | "epics" | "in-progress" | "done";
}

interface BoardPageProps {
    tasks?: Task[];
}

export const BoardPage = ({tasks = []}: BoardPageProps) => {
    const [taskList, setTaskList] = useState<Task[]>(tasks);
    const [activeId, setActiveId] = useState<string | null>(null);
    const [selectedTask, setSelectedTask] = useState<Task | null>(null);

    const sensors = useSensors(useSensor(PointerSensor));

    const getTasksByCategory = (category: Task["category"]) =>
        taskList.filter(task => task.category === category);

    const handleDragStart = (event: any) => {
        setActiveId(event.active.id);
    };

    const handleDragEnd = (event: any) => {
        const {active, over} = event;
        setActiveId(null);
        if (!over) return;

        const activeTask = taskList.find(t => t.id === active.id);
        if (!activeTask) return;

        const isOverColumn = categories.some(cat => cat.key === over.id);
        const isOverTask = taskList.find(t => t.id === over.id);

        if (isOverColumn) {
            setTaskList(prev =>
                prev.map(task =>
                    task.id === active.id
                        ? {...task, category: over.id as Task["category"]}
                        : task
                )
            );
        } else if (isOverTask) {
            if (activeTask.category !== isOverTask.category) {
                setTaskList(prev =>
                    prev.map(task =>
                        task.id === active.id
                            ? {...task, category: isOverTask.category}
                            : task
                    )
                );
            } else {
                const tasksInCategory = getTasksByCategory(activeTask.category);
                const oldIndex = tasksInCategory.findIndex(t => t.id === active.id);
                const newIndex = tasksInCategory.findIndex(t => t.id === over.id);
                const newOrdered = arrayMove(tasksInCategory, oldIndex, newIndex);
                const updatedTasks = taskList.filter(t => t.category !== activeTask.category);
                setTaskList([...updatedTasks, ...newOrdered]);
            }
        }
    };

    useEffect(() => {
        document.title = "Доска";
    }, []);

    const categories: { label: string; key: Task["category"] }[] = [
        {label: "Сделать", key: "todo"},
        {label: "В процессе", key: "in-progress"},
        {label: "Выполнены", key: "done"},
    ];

    const activeTask = taskList.find(t => t.id === activeId);

    const DroppableColumn = ({id, children}: { id: string, children: React.ReactNode }) => {
        const {setNodeRef} = useDroppable({id});
        return (
            <div ref={setNodeRef} style={{flex: 1, minHeight: "200px"}}>
                {children}
            </div>
        );
    };

    return (
        <div style={{display: "flex"}}>
        <BoardSelectPanel boards={boards}/>
        <DndContext
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            sensors={sensors}
        >
            <div className="board-columns">
                {categories.map(({ label, key }) => {
                    const tasks = getTasksByCategory(key);
                    return (
                        <div className="board-column" key={key}>
                            <div style={{display: "flex"}}>
                                <h1>{label}</h1>

                                <SortButton onSortChange={(sortType) => {
                                    setTaskList(prev => {
                                        const currentTasks = prev.filter(task => task.category === key);
                                        const otherTasks = prev.filter(task => task.category !== key);

                                        const sorted = [...currentTasks].sort((b, a) => {
                                            if (sortType === 'date') {
                                                return new Date(b.date).getTime() - new Date(a.date).getTime();
                                            }
                                            return 0;
                                        });

                                        return [...otherTasks, ...sorted];
                                    });
                                }} />
                            </div>


                            <DroppableColumn id={key}>
                                <SortableContext
                                    items={tasks.map(t => t.id)}
                                    strategy={verticalListSortingStrategy}
                                >
                                    {key !== 'done' && (
                                        <button className="column-add-task-btn">Добавить задачу</button>
                                    )}
                                    {tasks.map(task => (
                                        <SortableTask
                                            key={task.id}
                                            task={task}
                                            activeId={activeId}
                                            onClick={() => setSelectedTask(task)}
                                        />
                                    ))}
                                </SortableContext>
                            </DroppableColumn>
                        </div>
                    );
                })}
                {/* <button className="add-column-button" onClick={() => {}}>Добавить колонку</button> */}
            </div>

            {selectedTask && (
                <TaskSidebar task={selectedTask} onClose={() => setSelectedTask(null)} />
            )}

            <DragOverlay>
                {activeTask ? (
                    <TaskComponent
                        name={activeTask.userName}
                        avatar={activeTask.userAvatar || defaultAvatar}
                        taskText={activeTask.description}
                        date={activeTask.date}
                    />
                ) : null}
            </DragOverlay>
        </DndContext>
        </div>
    );
};
