import { useEffect, useState } from "react";
import {Task} from "../../pages/board-page";
import {formatDateToDayMonth} from "../../utils.ts";
import "../../styles/board-page/task-sidebar.css";

interface TaskSidebarProps {
    task: Task;
    onClose: () => void;
}

export const TaskSidebar = ({task, onClose}: TaskSidebarProps) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);

    const handleClose = () => {
        setVisible(false);
        setTimeout(() => onClose(), 300); // match CSS transition duration
    };

    return (
        <div className={`task-sidebar ${visible ? "open" : ""}`}>
            <button className="close-button" onClick={handleClose}>×</button>
            <p className='task-sidebar-username'>{task.userName}</p>
            <h2 className='task-sidebar-title'>{task.description}</h2>
            <div className='task-sidebar-short-info-container'>
                <div className='task-sidebar-short-info'>
                    <p>Создатель</p>
                    <p>Без имени</p>
                </div>
                <div className='task-sidebar-short-info'>
                    <p>Исполнитель</p>
                    <p>{task.userName}</p>
                </div>
                <div className='task-sidebar-short-info'>
                    <p>Дедлайн</p>
                    <p>ထ</p>
                </div>
                <div className='task-sidebar-short-info'>
                    <p>Приоритет</p>
                    <p className='task-sidebar-priority'>Низкий</p>
                </div>
                <div className='task-sidebar-short-info'>
                    <p>Дата создания</p>
                    <p>{formatDateToDayMonth(task.date)}</p>
                </div>
                <h3 className='task-sidebar-desc-title'>Описание:</h3>
                <p className='task-sidebar-description'>Необходимо проанализировать текущую схему базы данных и определить, какие изменения требуется внести, чтобы удовлетворить потребности заказчика. Это может включать добавление новых таблиц, изменение существующих полей, создание связей между таблицами, изменение типов данных, внедрение ограничений</p>
                <h3 className='task-sidebar-comm-title'>Комментарии</h3>
            </div>
        </div>
    );
};