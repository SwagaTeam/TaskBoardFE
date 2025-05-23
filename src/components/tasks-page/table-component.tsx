import { useEffect, useState } from 'react';
import '../../styles/tasks-page/table-component.css';
import defaultAvatar from '../../assets/user-avatar.webp';

export interface Task {
    id: string;
    task: string;
    deadline: string;
    roles: string;
    priority: 'Низкий' | 'Средний' | 'Высокий';
    tracker: number;
    userAvatar?: string;
}

export const TableComponent = () => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await fetch('/api/item/get');
                if (!response.ok) {
                    throw new Error('Ошибка при получении задач');
                }
                const data = await response.json();

                const formattedTasks: Task[] = data.map((item: any) => ({
                    id: item.businessId,
                    task: item.title,
                    deadline: new Date(item.expectedEndDate).toLocaleDateString(),
                    roles: item.status?.name || 'Неизвестно',
                    priority: item.priorityText,
                    tracker: Math.floor(Math.random() * 101),
                    userAvatar: defaultAvatar,
                }));

                setTasks(formattedTasks);
            } catch (error) {
                console.error('Ошибка при загрузке задач:', error);
            }
        };

        fetchTasks();
    }, []);

    return (
        <div className="table-container">
            <table className="task-table">
                <thead>
                <tr>
                    <th style={{textAlign: 'left'}}>Задача</th>
                    <th style={{width: "70px"}}>Дедлайн</th>
                    <th style={{width: "70px"}}></th>
                    <th style={{width: "170px"}}>Роли</th>
                    <th style={{width: "110px"}}>Приоритет</th>
                    <th style={{width: "150px"}}>Трекер</th>
                </tr>
                </thead>
                <tbody>
                {tasks.map((task) => (
                    <tr key={task.id}>
                        <td>{task.id} {task.task}</td>
                        <td style={{color: '#80ADDB'}}>{task.deadline}</td>
                        <td><img className='table-avatar' src={task.userAvatar || defaultAvatar} alt="Аватарка"/></td>
                        <td>
                            <p style={{padding: "5px 16px 10px 16px", backgroundColor: "#122B45", height: "20px", borderRadius: "18px"}}>
                                {task.roles}
                            </p>
                        </td>
                        <td>
                            <span>{task.priority}</span>
                        </td>
                        <td>
                            <div className="tracker-wrapper">
                                <div className="tracker-bar">
                                    <div className="tracker-fill" style={{ width: `${task.tracker}%` }}></div>
                                </div>
                                <span className="tracker-bar-value">{task.tracker}</span>
                            </div>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
