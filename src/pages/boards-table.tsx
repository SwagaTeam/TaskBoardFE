import { useEffect, useState } from "react";
import { MoreVertical } from "lucide-react";
import "../styles/board-table.css";

interface Board {
    id: number;
    projectId: number;
    name: string;
    description: string;
    createdAt: string;
    itemsCount: number;
}

export const BoardsTable = () => {
    const [boards, setBoards] = useState<Board[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchBoards = async () => {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`/api/board/current`, {
                method: "GET",
                headers: {
                    accept: "*/*",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
            }

            const data = await response.json() as Board[];
            setBoards(data);
        } catch (err: any) {
            console.error("Ошибка при загрузке досок:", err);
            setError(err.message || "Неизвестная ошибка");
        }
    };

    useEffect(() => {
        fetchBoards();
    }, []);

    return (
        <div className="board-table-wrapper">
            {error && <p className="error">{error}</p>}
            <table className="board-table">
                <thead>
                <tr>
                    <th style={{ width: "252px" }}>Наименование</th>
                    <th style={{ width: "400px" }}>Описание</th>
                    <th style={{ width: "214px" }}>Дата создания</th>
                    <th style={{ width: "214px" }}>Количество задач</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {boards.map((board) => (
                    <tr key={board.id}>
                        <td>{board.name}</td>
                        <td>{board.description}</td>
                        <td>{new Date(board.createdAt).toLocaleDateString("ru-RU")}</td>
                        <td>{board.itemsCount}</td>
                        <td>
                            <button className="board-item-menu-btn">
                                <MoreVertical />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};
