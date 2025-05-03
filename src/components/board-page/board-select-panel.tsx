import { ChevronLeft } from 'lucide-react';

import '../../styles/board-page/board-select-panel.css'

export interface Board {
    name: string;
    tasksCount: number;
}

interface BoardsProps {
    boards: Board[];
}

export const BoardSelectPanel = ({boards}: BoardsProps) => {
    return (
        <div className="board-select-panel-container">
            <div className="board-select-buttons">
                <button style={{background: 'none', border: 'none', padding: '0px', margin: '0px', marginLeft: '-3px'}}>
                    <ChevronLeft size={50} color="#fff"/>
                </button>
                <button>Добавить доску</button>
            </div>
            <div className="select-boards">
                {boards.map((board) => (
                    <div key={board.name} className="board-item">
                        <p>{board.name}</p>
                        <span>{board.tasksCount} задач</span>
                    </div>
                ))}
            </div>
        </div>
    )
}