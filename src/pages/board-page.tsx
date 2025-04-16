import {TaskComponent} from "../components/board-page/task-component";
import {useEffect} from "react";
import '../styles/board-page/board-page.css'
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
    const todos = tasks.filter(task => task.category === "todo");
    const epics = tasks.filter(task => task.category === "epics");
    const inProgress = tasks.filter(task => task.category === "in-progress");
    const done = tasks.filter(task => task.category === "done");

    useEffect(() => {
        document.title = "Доска"
    }, []);

    return (
            <div className="board-columns">
                <div className="board-column">
                    <h1>Сделать</h1>
                    {todos.map(_ => (
                        <TaskComponent
                            name={_.userName}
                            avatar={_.userAvatar || defaultAvatar}
                            taskText={_.description}
                            date={_.date}
                        />
                    ))}
                </div>
                <div className="board-column">
                    <h1>Эпики</h1>
                    {epics.map(_ => (
                        <TaskComponent
                            name={_.userName}
                            avatar={_.userAvatar || defaultAvatar}
                            taskText={_.description}
                            date={_.date}
                        />
                    ))}
                </div>
                <div className="board-column">
                    <h1>В процессе</h1>
                    {inProgress.map(_ => (
                        <TaskComponent
                            name={_.userName}
                            avatar={_.userAvatar || defaultAvatar}
                            taskText={_.description}
                            date={_.date}
                        />
                    ))}
                </div>
                <div className="board-column">
                    <h1>Выполнены</h1>
                    {done.map(_ => (
                        <TaskComponent
                            name={_.userName}
                            avatar={_.userAvatar || defaultAvatar}
                            taskText={_.description}
                            date={_.date}
                        />
                    ))}
                </div>
            </div>
    )
}
