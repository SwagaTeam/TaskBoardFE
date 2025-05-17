import { Folder } from "lucide-react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "../styles/boards-page/project-board-page.css";
import { ProjectNavigationComponent } from "../components/project-page/project-navigation-component.tsx";
import { CreateBoardModal } from "../components/create-board-modal-component.tsx";
import { useAppDispatch, useAppSelector } from "../store/hooks.ts";
import { fetchBoardsByProject } from "../store/boardSlice";

type Board = {
    id: number;
    name: string;
};

export const ProjectBoardsPage = () => {
    const { id } = useParams();
    const projectId = Number(id);
    const dispatch = useAppDispatch();
    const { byProject } = useAppSelector((s) => s.boards);
    const boards: Board[] = byProject[projectId] || [];
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if (projectId) dispatch(fetchBoardsByProject(projectId));
    }, [dispatch, projectId]);

    const refreshBoards = () => dispatch(fetchBoardsByProject(projectId));

    return (
        <div className="board-page-wrapper">
            <div className="board-page-header">
                <div className="project-title">Проект №{projectId}</div>
                <ProjectNavigationComponent />
            </div>

            <div className="board-page-list">
                {boards.map((board) => (
                    <div key={board.id} className="board-page-item">
                        <div className="board-icon-wrapper">
                            <Folder size={24} />
                        </div>
                        <span>{board.name}</span>
                    </div>
                ))}

                <button className="add-board-btn" onClick={() => setShowModal(true)}>
                    Добавить доску
                </button>
            </div>

            {showModal && (
                <CreateBoardModal
                    projectId={projectId}
                    onCreated={refreshBoards}
                    onClose={() => setShowModal(false)}
                />
            )}
        </div>
    );
};
