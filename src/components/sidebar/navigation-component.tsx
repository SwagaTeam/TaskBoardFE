import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import '../../styles/sidebar-component/navigation-component.css'
type NavigationItem = {
    [key: string]: string;
};

const navigation_List: NavigationItem = {
    "Проекты": "projects",
    "Доски": "boards",
    "Задачи": "tasks",
    "Настройки": "settings",
    "История": "history",
} as const

export const NavigationComponent = () => {
    const navigate = useNavigate();
    const [activePath, setActivePath] = useState("boards");

    return (
        <div className="navigation">
            {Object.entries(navigation_List).map(([title, path]) => (
                <button
                    key={path}
                    onClick={() => {
                        navigate(`/home/${path}`);
                        setActivePath(path);
                    }}
                    className={`nav-link ${activePath === path ? 'active' : ''}`}
                >
                    {title}
                </button>
            ))}
        </div>
    );
};
