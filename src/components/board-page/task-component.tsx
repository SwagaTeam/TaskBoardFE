import MenuIcon from '../../assets/menu.svg';
import PaperClipIcon from '../../assets/paper-clip.svg';
import ClockIcon from '../../assets/clock.svg';
import '../../styles/board-page/task-component.css';
import { formatDateToDayMonth } from '../../utils.ts';
import { Task } from '../../pages/board-page';
import {getTaskPriorityColor} from "../../utils";

interface TaskComponentProps {
    task: Task;
}

export const TaskComponent = ({ task }: TaskComponentProps) => {
    return (
        <div className="task">
            <div className="task-first-sect">
                <div className="task-text-container">
                    <button onClick={() => {}} className="task-username">
                        {task?.contributor || 'Не задан'}
                    </button>
                    <p className="task-text">{task.title}</p>
                </div>
                {task.userAvatar && task.contributor && (
                    <img className="task-user-avatar" src={task.userAvatar} alt="Аватар профиля" />
                )}
            </div>
            <div>
                <div className="task-time">
                    <img src={ClockIcon} alt="Дедлайн" />
                    <p>{formatDateToDayMonth(task.expectedEndDate)}</p>
                    <div className="task-priority-container" style={{ marginLeft: '20px' }}>
                        <button onClick={() => {}}>
                            <img src={PaperClipIcon} alt="Прикрепить что-то..." />
                        </button>
                    </div>
                    <span
                        className="task-priority-dot"
                        style={{ backgroundColor: getTaskPriorityColor(task.priority) }}
                    ></span>
                </div>
            </div>
        </div>
    );
};
