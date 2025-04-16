import MenuIcon from '../../assets/menu.svg';
import PaperClipIcon from '../../assets/paper-clip.svg';
import ClockIcon from '../../assets/clock.svg';

import '../../styles/board-page/task-component.css'
import {formatDateToDayMonth} from "../../utils.ts";

interface BoardTaskProps {
    name: string;
    avatar: string;
    taskText: string;
    date: string;
}

export const TaskComponent = ({name, avatar, taskText, date} : BoardTaskProps) => {

    return (
        <div className="task">
            <div className="task-first-sect">
                <div className="task-text-container">
                    <button onClick={() => {}} className='task-username'>
                        {name}
                    </button>
                    <p className='task-text'>{taskText}</p>
                </div>
                <img className='task-user-avatar' src={avatar} alt="Аватар профиля"/>
            </div>
            <div>
                <div className="task-time">
                    <img src={ClockIcon} alt="Дедлайн"/>
                    <p>{formatDateToDayMonth(date)}</p>
                    <button onClick={() => {
                    }}>
                        <img src={MenuIcon} alt="Меню"/>
                    </button>
                    <button onClick={() => {
                    }}>
                        <img src={PaperClipIcon} alt="Прикрепить что-то..."/>
                    </button>
                </div>
            </div>
        </div>
    );
}
