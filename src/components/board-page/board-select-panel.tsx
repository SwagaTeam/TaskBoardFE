
interface Board {
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
                <button>Добавить доску</button>
            </div>
            <div className="select-boards">
                {boards.map((board) => (
                    <div key={board.name} className="board-item">
                        <span>{board.name}</span>
                        <span>({board.tasksCount} задач)</span>
                    </div>
                ))}
            </div>
        </div>
    )
}