import "../../styles/project-page/project-page.css";
import { useEffect, useMemo, useState } from "react";
import ProjectModalComponent from "./project-modal-component.tsx";
import { MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../store/hooks.ts"; // обёртки вокруг useDispatch/useSelector с типами
import { fetchProjects } from "../../store/projectSlice";

const formatDateRangeWithoutYear = (start: string, end: string): string => {
    const toDayMonth = (isoDate: string): string => {
        const date = new Date(isoDate);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        return `${day}.${month}`;
    };
    return `${toDayMonth(start)} - ${toDayMonth(end)}`;
};

type Project = {
    id: number;
    key: string;
    name: string;
    description: string;
    isPrivate: boolean;
    startDate: string;
    expectedEndDate: string;
    priority: number;
};

interface ProjectTableProps {
    search: string;
}

export const ProjectTableComponent: React.FC<ProjectTableProps> = ({ search }) => {
    const dispatch = useAppDispatch();
    const { items: projects, status } = useAppSelector((state) => state.projects);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProjects());
        }
    }, [dispatch, status]);

    const filteredProjects = useMemo(
        () =>
            projects.filter((p: Project) =>
                p.name.toLowerCase().includes(search.toLowerCase())
            ),
        [projects, search]
    );

    const handleProjectCreated = () => {
        dispatch(fetchProjects());
        setShowModal(false);
    };

    const handleRowClick = (id: number) => {
        navigate(`/home/project/${id}/boards`);
    };

    return (
        <div className="project-table-wrapper">
            <table className="project-table">
                <thead>
                <tr>
                    <th style={{ width: "252px" }}>Наименование</th>
                    <th style={{ width: "156px" }}>Приватный</th>
                    <th style={{ width: "214px" }}>Дата</th>
                    <th style={{ width: "232px" }}>Приоритет</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {filteredProjects.map((proj: Project) => (
                    <tr
                        key={proj.id}
                        onClick={() => handleRowClick(proj.id)}
                        style={{ cursor: "pointer" }}
                    >
                        <td>{proj.name}</td>
                        <td>{proj.isPrivate ? "Да" : "Нет"}</td>
                        <td>
                            {formatDateRangeWithoutYear(
                                proj.startDate,
                                proj.expectedEndDate
                            )}
                        </td>
                        <td>{proj.priority}</td>
                        <td>
                            <button
                                className="project-item-menu-btn"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <MoreVertical />
                            </button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <button className="add-button" onClick={() => setShowModal(true)}>
                Добавить проект
            </button>

            {showModal && (
                <ProjectModalComponent
                    onClose={() => setShowModal(false)}
                    onCreated={handleProjectCreated}
                />
            )}
        </div>
    );
};
