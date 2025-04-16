import { useNavigate } from 'react-router-dom';
import '../../styles/sidebar-component/navigation-component.css'
type NavigationItem = {
    [key: string]: string;
};

const navigation_List: NavigationItem = {
    "Доска": "/board",
    "Задачи": "/tasks",
    "Обзор": "/review",
    "Настройки": "/settings",
} as const

export const NavigationComponent = () => {
    const navigate = useNavigate();

    return (
        <div className="navigation">
            {Object.entries(navigation_List).map(([title, path]) => (
                <button
                    key={path}
                    onClick={() => navigate(path)}
                    className="nav-link"
                >
                    {title}
                </button>
            ))}
        </div>
    );
};
